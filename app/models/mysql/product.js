const { mysqlConnection } = require('../../config/database');

class Product {
  static async getAll() {
    const [rows] = await mysqlConnection.query('SELECT * FROM products');
    return rows;
  }

  static async getById(id) {
    const [rows] = await mysqlConnection.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(product) {
    const { name, description, price, stock, category_id } = product;
    const [result] = await mysqlConnection.query(
      'INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, stock, category_id]
    );
    return { id: result.insertId, ...product };
  }

  static async update(id, product) {
    const { name, description, price, stock, category_id } = product;
    await mysqlConnection.query(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?',
      [name, description, price, stock, category_id, id]
    );
    return this.getById(id);
  }

  static async delete(id) {
    await mysqlConnection.query('DELETE FROM products WHERE id = ?', [id]);
  }
}

module.exports = Product;