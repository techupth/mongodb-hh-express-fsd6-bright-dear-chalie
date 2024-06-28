import { Router } from 'express';

import { db } from '../utils/db.js';

const productRouter = Router();

productRouter.get('/', (req, res) => {});

productRouter.get('/:id', (req, res) => {});

productRouter.post('/', async (req, res) => {
  const collection = db.collection('products');
  const productData = { ...req.body };
  try {
    const products = await collection.insertOne(productData);
    console.log(products);
  } catch (error) {
    return res.status(500).json({
      message:
        'Server could not create a new question because of database connection'
    });
  }

  return res
    .status(200)
    .json({ message: 'Product has been created successfully' });
});

productRouter.put('/:id', (req, res) => {});

productRouter.delete('/:id', (req, res) => {});

export default productRouter;
