import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config()

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  port:5432,
  dialect: 'postgres',
  logging: false,
});
 
export default sequelize;  