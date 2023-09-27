import mongoose from "mongoose"
import { DB_URL } from "../config/index.js";

export async function databaseConnection() {


    try {
      const db =   await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
       
        });
        console.log('Db Connected ' + db.connection.host);

    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }

};


