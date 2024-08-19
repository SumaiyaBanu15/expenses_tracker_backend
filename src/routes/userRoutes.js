import express from 'express'
import UserController from '../controllers/userController.js'

const router = express.Router()

router.post('/signup',UserController.createAccount)
router.post('/login', UserController.loginAccount)

export default router