import { emptyLog } from './utils.js';
import { dbSync } from './database/dbSync.js';
import { logOut, logError } from './loggers/log2File.js';

//import { startModule as FBoschettiSM } from '../FBoschetti/Fboschetti.js';

import { runAdminJS } from './adminJS.js';

export const avvioApp = async () => {
    try {
        await emptyLog();
        await dbSync();
        logOut('Avvio modulo fBoschetti...');
        //await FBoschettiSM();
        runAdminJS();
        //avvioWatcher(pathToWatch+'/**/*.(stl|STL)');
    } catch (error) {
        logError(error);
    }
}