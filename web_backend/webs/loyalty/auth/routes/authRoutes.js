import express from 'express';
import { login } from '../controller/login.js';
import { resetPassword } from '../controller/resetPassword.js';
import { sendOTP } from '../controller/sendOTP.js';
import { verifyOTP } from '../controller/verifyOTP.js';
import { logoutUser } from '../controller/logout.js';
import { authenticateToken } from '@shared/middlewares/authenticateToken.js';
import { setUserContext } from "@shared/dbConfig/database.js";


const authRoute = express.Router();

// Auth
authRoute.post('/login', login);
authRoute.put('/reset_password', resetPassword);
authRoute.put('/send_otp', sendOTP);
authRoute.put('/verify_otp', verifyOTP);
authRoute.delete('/logout', authenticateToken, setUserContext, logoutUser);


export default authRoute;