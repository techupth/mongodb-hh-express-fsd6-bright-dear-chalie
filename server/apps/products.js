import { Router } from 'express';

import { db } from '../utils/db.js';
import { ObjectId } from 'mongodb';

const productRouter = Router();

productRouter.get('/', async (req, res) => {
  const collection = db.collection('products');

  let productList;
  try {
    productList = await collection.find().toArray();
    // console.log(productList);
  } catch (error) {
    return res.status(500).json({
      message: 'Server could not read products because of database connection'
    });
  }

  return res.status(200).json({ data: productList });
});

productRouter.get('/:id', (req, res) => {});

productRouter.post('/', async (req, res) => {
  const collection = db.collection('products');

  const productData = { ...req.body };

  let insertedResult;
  try {
    insertedResult = await collection.insertOne(productData);
    // console.log(products);
  } catch (error) {
    return res.status(500).json({
      message:
        'Server could not create a new product because of database connection'
    });
  }

  return res.status(201).json({
    message: `Product record (${insertedResult.insertedId}) has been created successfully`
  });
});

productRouter.put('/:id', async (req, res) => {
  const collection = db.collection('products');
  const productId = new ObjectId(req.params.id);
  const newProductData = { ...req.body, modified_at: new Date() };

  let result;
  try {
    result = await collection.updateOne(
      { _id: productId },
      { $set: newProductData }
    );
  } catch (error) {
    return res.status(500).json({
      message:
        'Server could not update a specific product because of database connection'
    });
  }

  if (!result.modifiedCount) {
    return res.status(404).json({
      message: `Server could not find a specific product (_id: ${productId}) to update`
    });
  }

  return res.status(201).json({
    message: `Product record ${productId} has been updated successfully.`
  });
});

productRouter.delete('/:id', async (req, res) => {
  const collection = db.collection('products');
  const productId = new ObjectId(req.params.id);

  let result;
  try {
    result = await collection.deleteOne({ _id: productId });
  } catch (error) {
    return res.status(500).json({
      message:
        'Server could not delete a specific product because of database connection'
    });
  }

  if (!result.deletedCount) {
    return res.status(404).json({
      message: `Server could not find a specific product (_id: ${productId}) to delete`
    });
  }

  return res.status(200).json({
    message: `Product (_id: ${productId}) has been deleted successfully.`
  });
});

export default productRouter;
