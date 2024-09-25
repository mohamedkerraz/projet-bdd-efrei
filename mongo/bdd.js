db = db.getSiblingDB('food_shop');

db.createCollection('users');
db.createCollection('categories');
db.createCollection('products');
db.createCollection('orders');

db.users.insertOne({
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date()
});

db.categories.insertMany([
  { name: 'Fruits' },
  { name: 'Vegetables' }
]);

db.products.insertMany([
  {
    name: 'Apple',
    description: 'Fresh red apple',
    price: 1.99,
    stock: 100,
    category: { name: 'Fruits' }
  },
  {
    name: 'Banana',
    description: 'Yellow banana',
    price: 0.99,
    stock: 150,
    category: { name: 'Fruits' }
  },
  {
    name: 'Carrot',
    description: 'Orange carrot',
    price: 0.50,
    stock: 200,
    category: { name: 'Vegetables' }
  }
]);