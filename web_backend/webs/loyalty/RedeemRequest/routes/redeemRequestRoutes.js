import express from 'express';
import { getAllredeemRequest, getRedeemRequestById, updateRedeemRequest, updateShippingDetails } from '../controllers/redeemRequestController.js';
const redeemRouter = express.Router();

redeemRouter.post('/getAll_redeem_request', getAllredeemRequest);
redeemRouter.get('/get_redeem_request/:id', getRedeemRequestById);
redeemRouter.put('/update_redeem_request/:id', updateRedeemRequest);
redeemRouter.put('/update_shipping_details/:id', updateShippingDetails);
export default redeemRouter;