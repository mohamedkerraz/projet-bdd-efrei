const express = require('express');
const { mysqlConnection, mongoConnection, neo4jDriver } = require('./config/database');

const mysqlRoutes = require('./routes/mysql');
const mongodbRoutes = require('./routes/mongodb');
const neo4jRoutes = require('./routes/neo4j');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/mysql', mysqlRoutes);
app.use('/mongodb', mongodbRoutes);
app.use('/neo4j', neo4jRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Food Shop API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  mysqlConnection.end();
  mongoConnection.close();
  neo4jDriver.close();
  app.close(() => {
    console.log('HTTP server closed');
  });
});