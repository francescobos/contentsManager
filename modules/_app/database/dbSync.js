import { sequelize } from "../../../config/dbConfig.js";

let dataReset = process.env.DATA_RESET === "true";

export const dbSync = async () => {

    try {
        await sequelize.sync({ force: dataReset });
    } catch (error) {
        console.log(error);
    }

}