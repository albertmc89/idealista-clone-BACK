import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";

const app = express();
app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));
app.use(express.json());

const corsOptions = {
  origin: [process.env.ALLOW_PROD_ORIGIN!, process.env.ALLOW_LOCAL_ORIGIN!],
};

app.use(cors(corsOptions));

export default app;
