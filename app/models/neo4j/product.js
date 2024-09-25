const { neo4jDriver } = require('../../config/database');

class Product {
  static async getAll() {
    const session = neo4jDriver.session();
    try {
      const result = await session.run('MATCH (p:Product) RETURN p');
      return result.records.map(record => record.get('p').properties);
    } finally {
      await session.close();
    }
  }

  static async getByName(name) {
    const session = neo4jDriver.session();
    try {
      const result = await session.run(
        'MATCH (p:Product {name: $name}) RETURN p',
        { name }
      );
      return result.records.length > 0 ? result.records[0].get('p').properties : null;
    } finally {
      await session.close();
    }
  }

  static async create(product) {
    const session = neo4jDriver.session();
    try {
      const result = await session.run(
        'CREATE (p:Product $product) RETURN p',
        { product }
      );
      return result.records[0].get('p').properties;
    } finally {
      await session.close();
    }
  }

  static async update(name, product) {
    const session = neo4jDriver.session();
    try {
      const result = await session.run(
        'MATCH (p:Product {name: $name}) SET p += $product RETURN p',
        { name, product }
      );
      return result.records[0].get('p').properties;
    } finally {
      await session.close();
    }
  }

  static async delete(name) {
    const session = neo4jDriver.session();
    try {
      await session.run(
        'MATCH (p:Product {name: $name}) DELETE p',
        { name }
      );
    } finally {
      await session.close();
    }
  }
}

module.exports = Product;