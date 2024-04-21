import { config } from 'dotenv';
config();
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const fileOut = join(__dirname, '../../../logs', process.env.LOG_OUT_FILE);
const fileError = join(__dirname, '../../../logs', process.env.LOG_ERROR_FILE);

export const logOut = async (log) => {
    try {
        await fs.appendFile(fileOut, new Date().toISOString()+";"+log + "\n");
    } catch (error) {
        console.error("Errore logger nell'aggiungere la riga al file:", error);
    }
}

export const logError = async (log) => {
    try {
        await fs.appendFile(fileError, new Date().toISOString() + ";" + log + "\n");
    } 
    catch (error) {
        console.error("Errore logger nell'aggiungere la riga al file:", error);
    }
}