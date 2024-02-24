import debug from "debug";
import startServer from "./server/startServer.js";
import connectToDataBase from "./database/connectToDataBase.js";

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_URL;

try {
  await connectToDataBase(mongoDbUrl!);

  startServer(+port);

  debug("Connected to database");
} catch (error) {
  debug("Error connecting to database");
  debug((error as Error).message);

  process.exit(1);
}
