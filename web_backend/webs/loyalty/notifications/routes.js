import express from 'express';
import { getNotifications, getReadNotifications, setReadNotification } from './index.js';

const router = express.Router();

router.post('/get_notification', getNotifications)
router.put('/set_read_notification', setReadNotification)
router.get('/get_read_notifications', getReadNotifications)
export default router;
