import {config} from 'dotenv'; 
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
config({path:join(__dirname, '../../.env' )});

import { sequelize } from "../../../config/dbConfig.js";

let dataReset = process.env.DATA_RESET === "true";

export const dbSync = async () => {

    try {
        await sequelize.sync({ force: dataReset });
    } catch (error) {
        console.log(error);
    }

}