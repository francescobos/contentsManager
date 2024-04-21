import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

import { logOut, logError } from './loggers/log2File.js';

/* module for hash calculation */
import { createHash } from 'crypto';
import { createReadStream } from 'fs';
/* end */

const _emptyFile = async (filePath) => {
    try {
      await fs.writeFile(filePath, '');
    } catch (err) {
      console.error("Errore during writing file:", err);
    }
};

const _checkOrCreateDir = async (dirPath) => {

    try {
        await fs.access(dirPath);
        }   
    catch (error) {
        await fs.mkdir(dirPath, { recursive: true });
    }
}

export const emptyLog = async () => {
    try {

        let dataReset = process.env.DATA_RESET === "true";

        _checkOrCreateDir(join(__dirname,'../../logs'));
        _checkOrCreateDir(join(__dirname,'../../data'));

        const fileOut = join(__dirname, '../../logs', process.env.LOG_OUT_FILE);
        const fileError = join(__dirname, '../../logs', process.env.LOG_ERROR_FILE);

        if (dataReset){
            _emptyFile(fileOut);
            _emptyFile(fileError);
        }

    } catch (error) {
        logOut(error);
    }
}

export const checkPath = async (path) => {

    try {
        const stat = await fs.stat(path);
        if (!stat.isDirectory()) {
          await logError(`${path} non è una directory.`);
          process.exit(1);
        }
        await logOut(`${path} accessibile. Proseguo con l'avvio...`);
      } catch (error) {
        if (error.code === 'ENOENT') {
          await logger.logError(`${path} non accessibile.`);
          process.exit(1);
        }
        // Altri errori imprevisti
        logError(`Errore durante la verifica di ${path}:` + error);
        process.exit(1);
      }
}

export const calculateFileHash = async (filePath, algorithm = 'sha512') => {

  return new Promise((resolve, reject) => {
    const hash = createHash(algorithm);
    const stream = createReadStream(filePath);

    stream.on('data', (chunk) => {
      hash.update(chunk);
    });

    stream.on('end', () => {
      const digest = hash.digest('hex');
      resolve(digest);
    });

    stream.on('error', (error) => {
      logError(`Errore durante il calcolo dell'hash: ${error.message}`);
      reject(error);
    });
  });

}