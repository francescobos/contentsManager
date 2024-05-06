import {config} from 'dotenv'; 
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
config({path:join(__dirname, '../.env' )});

//console.log(__dirname, '../data/', process.env.DATABASE);

//console.log(join(__dirname, '../.env' ));

// import { logOut, logError } from '../modules/loggers/log2File.js';
// server solo se si loggano i log del db nel logger

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(__dirname, '../data/', process.env.DATABASE),
  // logging: (msg) => logger.logOut(`Sequelize: ${msg}`)
  logging: false
});