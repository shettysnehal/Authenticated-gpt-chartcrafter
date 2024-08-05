'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Verify the path to your config file
console.log('__dirname:', __dirname); // Ensure this is the directory where your index.js resides
const configPath = path.join(__dirname, '../config/config.js');
console.log('Config Path:', configPath);

// Replace with your Sequelize configuration from config/config.js
import sequelize from '../config/config'; // Adjust the path as per your setup

const db = {};

// Read all model files from the current directory
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      !file.includes('.test.js')
    );
  })
  .forEach(file => {
    // Load the model definition function from file
    const modelDefinition = require(path.join(__dirname, file)).default; // Assuming models are exported with `export default`

    // Call the model definition function with sequelize and DataTypes
    const model = new modelDefinition(sequelize, Sequelize.DataTypes);

    // Add the model to the db object
    db[model.name] = model;
  });

// Establish associations if available
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
