import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Sequelize, DataTypes } from 'sequelize';
import AdminJSSequelize from '@adminjs/sequelize';

AdminJS.registerAdapter(AdminJSSequelize);

const app = express();
const sequelize = new Sequelize('sqlite::memory:', { logging: false });

// Definisci i modelli
const Author = sequelize.define('Author', {
  name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

Author.hasMany(Book);
Book.belongsTo(Author);

// Configura AdminJS
const adminJS = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
});

const router = AdminJSExpress.buildRouter(adminJS);
app.use(adminJS.options.rootPath, router);

// Avvia il server
const run = async () => {
  await sequelize.sync({ force: true });
  await Author.create({
    name: 'J.K. Rowling',
    Books: [{ title: 'Harry Potter and the Sorcerer\'s Stone' }]
  }, { include: [Book] });
  
  app.listen(3000, () => console.log('AdminJS is running at http://localhost:3000/admin'));
}

run();
