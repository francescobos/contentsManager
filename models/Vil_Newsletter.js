import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const Vil_News_Contatti = sequelize.define('VilNewsContatti', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nomeCognome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  testSingolo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  testInvio: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'N'
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tags: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  data: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  newsletter: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Y'
  },
  ELIMINARE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  QUOTA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  prenotatiAnnoInCorso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  tagsMrPreno: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  consensoNews: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  consensoProfilazione: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  canaleAcquisizione: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  campagnaCorrente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }}
  ,{
    tableName: 'Vil_News_Contatti'
  }
);

const optionsView_Vil_News_Contatti = {
  resource: Vil_News_Contatti, 
  options: {
      properties: {
      'tags': { 
          position: 1,
          type: 'textarea',
          props: {
          rows: 3  
          }
      },
      'tagsMrPreno': { 
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
  Vil_News_Contatti,
  optionsView_Vil_News_Contatti
}