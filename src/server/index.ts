import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/pingController.js";
import {
  endpointNotFound,
  generalErrorHandler,
} from "./middlewares/error/errors.js";

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

const corsOptions = {
  origin: [process.env.ALLOW_PROD_ORIGIN!, process.env.ALLOW_LOCAL_ORIGIN!],
};

app.use(cors(corsOptions));

app.get("/", pingController);

app.use(endpointNotFound);
app.use(generalErrorHandler);

export default app;
