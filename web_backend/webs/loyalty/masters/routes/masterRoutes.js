import express from 'express';
import { addCurrentWalletBal, changeActiveStatus, createUser, deleteUser, getAllScannedCouponById, getAllUsers, getLedgerBalanceInfluencer, getPincodeDetails, getUserById, getUserToken, updateUser } from '../controllers/userController.js';
import { createModule, createRole, getAll, getAllRole, getModuleByDesignationId, softDeleteModule, softDeleteRole, updateModule, updateRole, upsertAssignDesignationModule } from '../controllers/ModuleController.js';

import { validateBody } from '@shared/common/validateBody.js';
import { createpointCatgeory, deletePointCategory, deleteProduct, getAllPointCategory, getAllProducts, getProductById, updatePointCategory, updateProductStatus, upsertProduct, updateProduct } from '../controllers/productController.js';
import { createPointMaster, getALLPointMaster, softDeletePointMaster, updatePointMaster } from '../controllers/pointMasterController.js';
import { validateParam } from '@shared/common/validateParam.js';
import { idParamSchema } from '@shared/common/idParamSchema.js';
import { pointMasterUpsertSchema } from '../joiValidators/pointMasterValidator.js';
import { deletePdf, generatePdf, getAllPdfs } from '../controllers/pdfController.js';
import { createModuleSchema } from '../joiValidators/moduleValidator.js';
import { validateCreateCategorySchema, validateCreateSubCategorySchema } from '../joiValidators/categoryValidator.js';
import { createCategory, createSUBCategory, deleteCategory, deletesubCategory, getAllCategory, getAllSUBCategory, updateCategory, updatestatusofcategory, updatestatusofsubcategory, updateSubCategory } from '../controllers/categoryController.js';
import { documentCatalogueSchema } from '../joiValidators/pdfValidator.js';
import upload from '@shared/middlewares/multerS3.js';
import { ProductValidationSchema } from '../joiValidators/validateProduct.js';

const masterRoute = express.Router();

// user
masterRoute.post('/get_pincode_details', getPincodeDetails);
masterRoute.post('/create_user', createUser);
masterRoute.post('/get_all_sfa_user', getAllUsers);
masterRoute.get('/get_user_by_id/:id', getUserById);
masterRoute.get('/get_user_from_token', getUserToken);
masterRoute.get('/get_user_ledger_balance/:id', validateParam(idParamSchema), getLedgerBalanceInfluencer);
masterRoute.put('/add_current_wallet_balance/:id', validateParam(idParamSchema), addCurrentWalletBal);
masterRoute.get('/get_scanned_coupon_by_id/:id', validateParam(idParamSchema), getAllScannedCouponById)
masterRoute.delete('/delete_user/:id', validateParam(idParamSchema), deleteUser);
masterRoute.put('/update_user/:id', validateParam(idParamSchema), updateUser);
masterRoute.put('/update_active_status/:id', validateParam(idParamSchema), changeActiveStatus)

// module Master 
masterRoute.post('/create_module', validateBody(createModuleSchema), createModule);
masterRoute.put('/update_module/:id', validateParam(idParamSchema), updateModule);
masterRoute.post('/get_aLL_module', getAll);
masterRoute.delete('/delete_module/:id', validateParam(idParamSchema), softDeleteModule);
// Role
masterRoute.post('/create_role', createRole);
masterRoute.put('/update_role/:id', validateParam(idParamSchema), updateRole);
masterRoute.delete('/delete_role/:id', validateParam(idParamSchema), softDeleteRole);
masterRoute.post('/get_all_role', getAllRole);
// Assign
masterRoute.put('/upsert_assign_designation_module/:id', validateParam(idParamSchema), upsertAssignDesignationModule);
masterRoute.post('/get_module_by_designation_id/:id', validateParam(idParamSchema), getModuleByDesignationId);

//referral Point Master
masterRoute.post('/create_point_master', validateBody(pointMasterUpsertSchema), createPointMaster);
masterRoute.post('/getAll_pointmaster', getALLPointMaster);
masterRoute.delete('/delete_point_master/:id', validateParam(idParamSchema), softDeletePointMaster);
masterRoute.put('/update_point_master/:id', validateParam(idParamSchema), updatePointMaster);



// pdf Module
masterRoute.post('/upload_pdf', upload.single('doc'), validateBody(documentCatalogueSchema), generatePdf)
masterRoute.post('/get_all_pdfs', getAllPdfs);
masterRoute.delete('/delete_pdf/:id', validateParam(idParamSchema), deletePdf)



// Categories
masterRoute.post('/create_cat', validateBody(validateCreateCategorySchema), createCategory);
masterRoute.post('/getALL_cat', getAllCategory);
masterRoute.delete('/category/:id', validateParam(idParamSchema), deleteCategory);
masterRoute.put('/update_category/:id', validateParam(idParamSchema), updateCategory);
masterRoute.put('/update_category_status/:id', validateParam(idParamSchema), updatestatusofcategory);

// SUB-Categories
masterRoute.post('/create_sub_cat', validateBody(validateCreateSubCategorySchema), createSUBCategory);
masterRoute.post('/getAll_sub_cat', getAllSUBCategory);
masterRoute.delete('/delete_sub_category/:id', validateParam(idParamSchema), deletesubCategory);
masterRoute.put('/update_sub_category/:id', validateParam(idParamSchema), updateSubCategory);
masterRoute.put('/update_sub_category_status/:id', validateParam(idParamSchema), updatestatusofsubcategory);

//  Point Category
masterRoute.post('/create_point_category', createpointCatgeory)
masterRoute.post('/getAll_point_category', getAllPointCategory)
masterRoute.put('/update_point_category/:id', updatePointCategory)
masterRoute.delete('/delete_point_category/:id', deletePointCategory)


// Product Module
masterRoute.post('/create_product', upload.single('image'), validateBody(ProductValidationSchema),
    upsertProduct);
masterRoute.get('/get_product_by_id/:id', validateParam(idParamSchema), getProductById);
masterRoute.put('/update_product/:id', upload.single('image'), validateParam(idParamSchema), updateProduct);
masterRoute.post('/getAll_product', getAllProducts);
masterRoute.delete('/delete_product/:id', validateParam(idParamSchema), deleteProduct);
masterRoute.put('/update_product_status/:id', validateParam(idParamSchema), updateProductStatus);
export default masterRoute;