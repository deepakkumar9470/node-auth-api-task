import express from "express";
const router = express.Router()

import UserController from '../controllers/userController.js'

import checkUserAuth from '../middleware/auth-middleware.js'


// Protected Routes
router.use('/me', checkUserAuth)


// Register Route
// @ /api/user/register
router.post('/register', UserController.userregister)


// Login Route
// @ /api/user/login
router.post('/login', UserController.userlogin)


// Change Password Route
// @ /api/user/me
router.get('/me' ,UserController.getUser)



export default router