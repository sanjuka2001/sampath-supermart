import express from 'express';
import { upload } from '../configs/multer';
import authSeller from '../middlewares/authSeller';
import { addProduct, changeStock, productById, productList } from '../controllers/productController';

const productRouter = express.Router();

productRouter.post('/add',upload.array([images]),authSeller,addProduct);
productRouter.get('/list', productList);
productRouter.get('/id',productById);
productRouter.post('/stock',authSeller, changeStock);

export default productRouter;
