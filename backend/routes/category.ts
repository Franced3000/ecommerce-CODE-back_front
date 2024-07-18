import { Router } from 'express';
import { createCategory, getCategories, updateCategory } from '../controllers/category';
import { authenticateAdmin } from '../middleware/authUser';

const routerCategory = Router();

routerCategory.get('/categories', authenticateAdmin, getCategories);
routerCategory.post('/categories', authenticateAdmin, createCategory);
routerCategory.put('/categories/:id', authenticateAdmin, updateCategory);

export default routerCategory;
