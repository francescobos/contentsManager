import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';

AdminJS.registerAdapter(AdminJSSequelize);

const app = express();
import { sequelize } from "../../config/dbConfig.js";

import { FBoschettiFaqDxIt, optionsView_FBoschettiFaqDxIt  } from "../../models/FBoschetti.js";

const optionsView = [optionsView_FBoschettiFaqDxIt];

// Configura AdminJS
const adminJS = new AdminJS({
    databases: [sequelize],
    resources: optionsView,
    rootPath: '/admin',
  });

const router = AdminJSExpress.buildRouter(adminJS);
app.use(adminJS.options.rootPath, router);

// Avvia il server
export const runAdminJS = async () => {

    app.listen(3000, () => console.log('AdminJS is running at http://localhost:3000/admin'));
}