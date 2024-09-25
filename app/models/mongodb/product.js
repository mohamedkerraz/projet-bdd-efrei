const { mongoConnection } = require('../../config/database');
const { ObjectId } = require('mongodb');

class Product {
  static async getAll() {
    const db = (await mongoConnection).db();
    return await db.collection('products').find().toArray();
  }

  static async getById(id) {
    const db = (await mongoConnection).db();
    return await db.collection('products').findOne({ _id: new ObjectId(id) });
  }

  static async create(product) {
    const db = (await mongoConnection).db();
    const result = await db.collection('products').insertOne(product);
    return { _id: result.insertedId, ...product };
  }

  static async update(id, product) {
    const db = (await mongoConnection).db();
    await db.collection('products').updateOne(
      { _id: new ObjectId(id) },
      { $set: product }
    );
    return this.getById(id);
  }

  static async delete(id) {
    const db = (await mongoConnection).db();
    await db.collection('products').deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Product;