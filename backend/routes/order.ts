import { Router } from 'express';
import { createOrder, deleteOrder, getHistory, getOrder, updateOrder } from '../controllers/order';
import { authenticate } from '../middleware/authUser';

const routerOrder = Router();

routerOrder.get('/orders', authenticate, getHistory);
routerOrder.post('/orders', authenticate, createOrder);
routerOrder.get('/orders/:id', authenticate, getOrder);
routerOrder.put('/orders/:id', authenticate, updateOrder);
routerOrder.delete('/orders/:id', authenticate, deleteOrder);

export default routerOrder;
