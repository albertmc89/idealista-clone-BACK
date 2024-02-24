import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/pingController.js";
import {
  endpointNotFound,
  generalErrorHandler,
} from "./middlewares/error/errors.js";
import auth from "./middlewares/auth/auth.js";
import propertiesRouter from "./routers/propertiesRouters.js";

const corsOptions = {
  origin: [process.env.ALLOW_PROD_ORIGIN!, process.env.ALLOW_LOCAL_ORIGIN!],
};

const app = express();
app.disable("x-powered-by");

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());

app.get("/", pingController);

app.use(auth);

app.use("/properties", propertiesRouter);

app.use(endpointNotFound);

app.use(generalErrorHandler);

export default app;
