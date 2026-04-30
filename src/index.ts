import "dotenv/config";
import { createServer, Server } from "node:http";
import { expressApp } from "./app/index.js";
import connectToDB from "./app/common/config/db.js";
import { connectToNodemailer } from "./app/common/config/nodemailer.js";

async function main() {
  try {
    const PORT: number = process.env.PORT ? +process.env.PORT : 9000;
    const MongoConnectionString: string =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cohort";
    const NODE_ENV: string = process.env.NODE_ENV || "development";

    const server: Server = createServer(expressApp());

    await connectToDB(MongoConnectionString);
    connectToNodemailer();
    server.listen(PORT, () => {
      console.log(`🚀 Server is up and running at ${PORT} in ${NODE_ENV} mode`);
    });
  } catch (err) {
    console.log("Error starting http server");
    throw err;
  }
}

main();
