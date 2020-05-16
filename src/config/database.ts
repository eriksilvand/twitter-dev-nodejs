import { Sequelize } from 'sequelize';

export const database = new Sequelize('database', 'username', 'password', {
  database: "db",
  dialect: 'sqlite',
  storage: './database.sqlite'
});