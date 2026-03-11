import express from 'express';
import { getAllTickets, updateStatus } from '../controllers/ticketController.js';
import { authenticateToken } from '@shared/middlewares/authenticateToken.js';
const ticketRoutes = express.Router();

ticketRoutes.post('/get_all_tickets', getAllTickets);
ticketRoutes.put('/update_ticket_status/:id', authenticateToken, updateStatus);


export default ticketRoutes;