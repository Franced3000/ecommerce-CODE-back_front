import { Request, Response, Router } from 'express';
import Order from '../models/order';
import User from '../models/user';
import Cart from '../models/cart';

export const getHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const orders = await Order.findAndCountAll({
      where: {
        userId: req.body.user.id 
      },
      limit: Number(limit),
      offset: offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: orders.count,
      pages: Math.ceil(orders.count / Number(limit)),
      data: orders.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.body.user.id; 
    const { name, surname, address, postalCode, city, region, country } = req.body;

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart || !cart.products || cart.products.length === 0) {
      return res.status(404).json({ message: 'Carrello non trovato o vuoto' });
    }

    const order = await Order.create({
      userId,
      products: cart.products,
      total: cart.total,
      name,
      surname,
      address,
      postalCode,
      city,
      region,
      country,
      status: 'pending' 
    });

    await cart.update({ products: JSON.stringify([]), total: 0 });

    res.status(201).json(order);
  } catch (error) {
    console.error('Errore durante la creazione dell\'ordine:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteOrder = async (req: Request, res: Response): Promise<any> => {

  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({ status: 'deleted' });
    res.json({ message: 'Order marked as deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
Order.belongsTo(User, { foreignKey: 'userId' });

