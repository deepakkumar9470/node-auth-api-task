import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import UserModel from "../model/User.js";


class UserContoller{

    static userregister = async (req,res) =>{

         const {username,password,firstname,lastname} = req.body
        

         const user = await UserModel.findOne({username:username})

         if(user){
               res.status(400).send({"result" :false, "message": "User already exist"})
         }else{
              
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hasedPassword = await bcrypt.hash(password, salt) 
                        const newuser = new UserModel({
                                username:username,
                                password:hasedPassword,
                                firstname : firstname,
                                lastname : lastname
                                
                             })

                       await newuser.save()

                       const saved_user = await UserModel.findOne({username : username})
                      //GENERATE JWT TOKEN
                       const token = await jwt.sign({userId : saved_user._id}, process.env.JWT_SECRET, {expiresIn : '1d'})

                       res.status(201).send({"result" : true, "message": "SignUp success,Please proceed to Signin", "token" : token})
                    } catch (error) {
                        res.status(400).send({"result" : false, "message": "Oops Regustration failed.."})
                    }
                
            
         }
    }


    static userlogin = async (req,res) =>{
          
        try {

            const {username, password} = req.body
            if(username && password){

                const user = await UserModel.findOne({username : username})
                if(user !=null){
                  
                    const isMatch = await bcrypt.compare(password, user.password)
                    if(isMatch && (user.username === username)){
                        //GENERATE JWT TOKEN
                       const token = await jwt.sign({userId : user._id}, process.env.JWT_SECRET, {expiresIn : '1d'})
                        res.status(200).send({"result":true, "jwt": token,  "message": "Signin success"})
                        
                    }else{
                        res.status(400).send({"result":false, "message":"Invalid credentials.."})                       
                    }
                    
                }else{
                    res.status(400).send({"result":false, "message":"You are not registered yet.."})
                }

            }else{
                res.status(400).send({"result":false, "message":"All fields are required.."})
            }
            
        } catch (error) {
            res.status(400).send({"result":false, "message":"Unable to login"})   
        }

    }


    static getUser = async (req,res) =>{
  
           try {
               

                const user = await UserModel.find({})
                res.status(200).send({"result":true,
                      "data":{user}
                    })

           } catch (error) {
              res.status(400).send({"result":false, "message":"Unable to get user"})
           }
        
    }

}



export default UserContoller