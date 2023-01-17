import mongoose from "mongoose";
import logger from "./logger";

const connect = async () => {
  const dbUri = process.env.DBURI as string;

  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to db");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
};

export default connect;
