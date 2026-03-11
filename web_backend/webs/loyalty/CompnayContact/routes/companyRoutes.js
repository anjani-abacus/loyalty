import express from "express";
import { createCompanyContact, getCompanyContact, updateCompanyContact } from "../controllers/companyControllers.js";
import upload from "@shared/middlewares/multerS3.js";

const companyRoutes = express.Router();

companyRoutes.post('/create_company_contact', upload.single('profile_img'), createCompanyContact)
companyRoutes.get('/get_company_contact', getCompanyContact)
companyRoutes.put('/update_company_contact', upload.single('profile_img'), updateCompanyContact)

export default companyRoutes;