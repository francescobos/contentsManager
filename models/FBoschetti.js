import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const FBoschettiFaqDxIt = sequelize.define('FBoschettiFaqDxIt', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  domanda: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  risposta: {
    type: DataTypes.TEXT,
    allowNull: false
  }}
  ,{
    tableName: 'FBoschetti_FaqDxIt'
  }
);

const optionsView_FBoschettiFaqDxIt = {
  resource: FBoschettiFaqDxIt, 
  options: {
      properties: {
      'domanda': { 
          position: 1,
          type: 'textarea',
          props: {
          rows: 3  
          }
      },
      'risposta': { 
        position: 2,
        type: 'textarea',
        props: {
        rows: 3  
        }
    },
      // Altre configurazioni dei campi...
      }
  }
}

export {
  FBoschettiFaqDxIt,
  optionsView_FBoschettiFaqDxIt
}