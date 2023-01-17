const dotenv = require("dotenv");

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

import connect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 5000;

const app = createServer();

app.listen(port, async () => {
  logger.info(`Server is listening at http://${host}:${port}/...`);

  await connect();
});
