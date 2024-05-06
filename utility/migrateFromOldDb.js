//const db = require('better-sqlite3')('../data/datiDB.db');
import sqlite from 'better-sqlite3';
const db = sqlite('../data/datiDB.db');

const allContatti = db.prepare("SELECT * from contattiVillaggio").all();

//console.log(allContatti);

import { dbSync } from '../modules/_app/database/dbSync.js';
import { Vil_News_Contatti, optionsView_Vil_News_Contatti  } from "../models/Vil_Newsletter.js";


/* insert function */
const insertVilNewsContatti = async (email, nomeCognome, testSingolo, testInvio, telefono, tags, data, unico, newsletter, ELIMINARE, QUOTA, prenotatiAnnoInCorso, tagsMrPreno, consensoNews, consensoProfilazione, canaleAcquisizione, campagnaCorrente) => {
    try {
      const newContatto = await Vil_News_Contatti.create({
        email,
        nomeCognome,
        testSingolo,
        testInvio,
        telefono,
        tags,
        data,
        unico,
        newsletter,
        ELIMINARE,
        QUOTA,
        prenotatiAnnoInCorso,
        tagsMrPreno,
        consensoNews,
        consensoProfilazione,
        canaleAcquisizione,
        campagnaCorrente
      });
  
      //console.log('Nuovo contatto inserito:', newContatto);
      return newContatto;
    } catch (error) {
      console.error('Errore durante l\'inserimento del contatto:', error);
      throw error;
    }
  }
  
 const runInsertGenerata = async () => {
    try {
      const contatto = await insertVilNewsContatti(
        'example@example.com',
        'Mario Rossi',
        'Testo singolo di esempio',
        'Y',
        '1234567890',
        'tag1, tag2',
        20240505, // supponendo che 'data' sia un timestamp o un formato simile
        'unico_id_12345',
        'Y',
        0,
        100,
        0,
        'tag_prenotazioni',
        1,
        0,
        'online',
        1
      );
      console.log('Contatto inserito con successo:', contatto);
    } catch (error) {
      console.error('Errore durante l\'inserimento:', error);
    }
  }

// const runInsert = async () => {
//   allContatti.forEach(element => {
//       insertVilNewsContatti(element.email, element.nomeCognome, element.testSingolo, element.testInvio, element.telefono, element.tags, element.data, element.unico, element.newsletter, element.ELIMINARE, element.QUOTA, element.prenotatiAnnoInCorso, element.tagsMrPreno, element.consensoNews, element.consensoProfilazione, element.canaleAcquisizione, element.campagnaCorrente);
//   });
// }

const runInsert = async () => {

  let promises = allContatti.map(element => {
    return insertVilNewsContatti(element.email, element.nomeCognome, element.testSingolo, element.testInvio, element.telefono, element.tags, element.data, element.unico, element.newsletter, element.ELIMINARE, element.QUOTA, element.prenotatiAnnoInCorso, element.tagsMrPreno, element.consensoNews, element.consensoProfilazione, element.canaleAcquisizione, element.campagnaCorrente);
  });

  await Promise.all(promises);
}

const allinea = async () => {
    try {
        await dbSync();

        let startTime = performance.now();
        await runInsert();
        let endTime = performance.now();
        console.log(`Tempo di esecuzione di runInsert: ${endTime - startTime} millisecondi`);
        
        //logOut('Avvio modulo fBoschetti...');
        //await FBoschettiSM();
        //runAdminJS();
        //avvioWatcher(pathToWatch+'/**/*.(stl|STL)');

    } catch (error) {
        console.log(error);
        //logError(error);
    }
}


allinea();