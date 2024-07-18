// controllers/cart.ts
import { Request, Response } from 'express';
import Cart from '../models/cart';
import Product from '../models/product'; 

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id; 
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: 'Carrello non trovato' });
    }
    res.status(200).json(cart);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const productId = parseInt(req.params.id, 10);
    const quantity = parseInt(req.body.quantity) || 1;

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId, products: JSON.stringify([]), total: 0 });
    }

    let products = JSON.parse(cart.products || '[]');
    const productDetails = await Product.findByPk(productId);

    if (!productDetails) {
      throw new Error('Prodotto non trovato');
    }

    const existingProduct = products.find((p: any) => p.id === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      products.push({ id: productId, quantity, price: productDetails.price });
    }

    const newTotal = products.reduce((acc: number, p: any) => acc + (p.quantity * p.price), 0);

    await cart.update({ products: JSON.stringify(products), total: newTotal });
    res.status(200).json(cart);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const productId = parseInt(req.params.id, 10);

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: 'Carrello non trovato' });
    }

    let products = JSON.parse(cart.products || '[]');
    products = products.filter((p: any) => p.id !== productId);
    const newTotal = products.reduce((acc: number, p: any) => acc + (p.quantity * p.price), 0);

    await cart.update({ products: JSON.stringify(products), total: newTotal });
    res.status(200).json(cart);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    await Cart.update({ products: JSON.stringify([]), total: 0 }, { where: { userId } });
    res.status(200).json({ message: 'Carrello svuotato con successo' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};
