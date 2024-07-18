import express from 'express';
import { idParamValidator } from '../middleware/validator';
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cart';
import { authenticate } from '../middleware/authUser';

const routerCart = express.Router();

routerCart.get('/cart', authenticate, getCart);
routerCart.post('/cart/add/:id', authenticate, addToCart);
routerCart.delete('/cart/remove/:id', authenticate, removeFromCart);
routerCart.delete('/cart/clear', authenticate, clearCart);

export default routerCart;