import mongoose from 'mongoose'
import Joi from 'joi'

const UserSchema = new mongoose.Schema({
    username: {
          type: String, 
          required: true, 
          trim: true,
          lowercase : true,
          minlength: 4
        },
   
    password: {
           type:  Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,8}$'))
        },
    firstname: {
          type: Joi.string().pattern(new RegExp('^[a-zA-Z]*$')), 
          required: true, 
          trim: true},
    lastname: {
          type: Joi.string().pattern(new RegExp('^[a-zA-Z]*$')), 
          required: true, 
          trim: true
        },      
}, {timestamps: true})



const UserModel = mongoose.model('user', UserSchema)

export default UserModel