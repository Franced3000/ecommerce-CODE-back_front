// routes/productRoutes.ts
import { Router } from 'express';
import {
  addProduct, getListProduct, getProductById, updateDescProduct, deleteProduct } from '../controllers/product';
import { authenticateAdmin } from '../middleware/authUser';
const routerProduct = Router();

routerProduct.post('/products', authenticateAdmin, addProduct); 
routerProduct.get('/products', getListProduct);
routerProduct.get('/products/:id', getProductById);
routerProduct.put('/products/:id/description', authenticateAdmin, updateDescProduct); 
routerProduct.delete('/products/:id', authenticateAdmin, deleteProduct); 

export default routerProduct;
