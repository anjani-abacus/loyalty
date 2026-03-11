import express from 'express';
import { createTicket, getTicketById, ticketQuerytype } from '../controller/controller.js';
import upload from '@shared/config/multer';
import { verifyToken } from '@shared/middlewares/auth.middleware.js';
const ticketRouter = express.Router();

ticketRouter.get('/ticket_query_type',ticketQuerytype);
ticketRouter.post('/create_ticket',upload.single('image'),verifyToken, createTicket);
ticketRouter.get('/get_ticket',verifyToken,getTicketById);

export default ticketRouter;