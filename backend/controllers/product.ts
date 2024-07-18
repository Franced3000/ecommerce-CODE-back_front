import Product from '../models/product'; 
import { Request, response, Response } from 'express';
import Category from '../models/category'


export const getListProduct = async (req: Request, res: Response): Promise<void> => {
    try {
const products = await Product.findAll({
    });
console.log('lista di prodotti:', products)
res.status(200).json(products);
} catch (error) {
    console.error('Lista non trovata', error);
    res.status(500).json({ message: 'Errore del server' });
};
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params

    try {
        const idProduct = await Product.findByPk(id)
    if (!idProduct) {
        response.status(404).json({ message: 'Prodotto non trovato' });
        return;    
    }
    res.status(200).json(idProduct);

    } catch (error) {
        console.error('Errore nel recuperare l\'utente:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
    };

    export const addProduct = async (req: Request, res: Response): Promise<void> => {
        const { name, description, price, id, category} = req.body;
      
        try {
          req.body.category = await Category.findByPk(id);
          if (!category) {
            res.status(404).json({ message: 'Categoria non trovata' });
            return;
          }
      
          const newProduct = await Product.create({
            name,
            description,
            price,
            id,
            category
          });
      
          res.status(201).json(newProduct);
        } catch (error) {
          console.error('Errore durante la creazione del prodotto:', error);
          res.status(500).json({ message: 'Errore del server' });
        }
      };

      export const updateDescProduct = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { description } = req.body;
    
        try {
            const existProduct = await Product.findByPk(id);
            if (!existProduct) {
                res.status(404).json({ message: 'Prodotto non esistente' });
                return;
            }
    
            existProduct.description = description;
            await existProduct.save(); 
    
            res.status(200).json({ message: 'Descrizione aggiornata con successo', product: existProduct });
        } catch (error) {
            console.error('Errore nell\'aggiornamento del prodotto', error);
            res.status(500).json({ message: 'Errore del server' });
        }
    };
      
    export const deleteProduct = async (req: Request, res: Response) => {
     const { id } = req.params
     console.log('id:', id)

     if (!id) {
            res.status(400).json({ message: 'Parametri mancanti' });
            return;
    }

    try {
        const product = await Product.findOne({
    where : {
        id: Number(id)
    }
    });

        if (!product) {
            res.status(404).json({ message: 'Prodotto non trovato' });
            return;
        }
        await product.destroy();
        res.status(200).json({ message: 'Prodotto eliminata con successo' });
    } catch (error) {
        console.error('Errore nell\'eliminazione dell prodotto:', error);
      res.status(500).json({ message: 'Errore del server' });
    }
}

export default Product