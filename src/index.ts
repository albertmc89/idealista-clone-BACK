import debug from "debug";
import startServer from "./server/startServer";

const port = process.env.PORT ?? 4009;

try {
  startServer(+port);

  debug("Connected to database");
} catch (error) {
  debug("Error connecting to database");
  debug((error as Error).message);

  process.exit(1);
}
