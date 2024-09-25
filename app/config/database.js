const mysql = require('mysql2/promise');
const { MongoClient } = require('mongodb');
const neo4j = require('neo4j-driver');

// MySQL connection
const mysqlConnection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'user',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'food_shop',
});

// MongoDB connection
const mongoClient = new MongoClient(process.env.MONGO_URI || 'mongodb://mongodb:27017/food_shop');
const mongoConnection = mongoClient.connect();

// Neo4j connection
const neo4jDriver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://neo4j:7687',
  neo4j.auth.basic(process.env.NEO4J_USER || 'neo4j', process.env.NEO4J_PASSWORD || 'password')
);

module.exports = { mysqlConnection, mongoConnection, neo4jDriver };