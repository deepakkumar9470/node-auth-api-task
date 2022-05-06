import jwt from "jsonwebtoken";
import UserModel from "../model/User.js";



const checkUserAuth = async (req,res,next) =>{
              
        let token;
        const {authorization} = req.headers
        if(authorization && authorization.startsWith('Bearer')){

            try {
                // Get the token from header
                token = authorization.split(' ')[1]

                // Verify token
                const { userId } =   jwt.verify(token, process.env.JWT_SECRET)

                
                // Get the user from token
                req.user = await UserModel.findById(userId).select('-password')

                next()

            } catch (error) {
                console.log(error)
                res.status(401).send({"result" : false, "message" : "JWT Verification failed"})
            }
        }

        if(!token){
            res.status(401).send({"result" : false, "message" : "Please Provide a JWT token"})
        }       

}



export default checkUserAuth

