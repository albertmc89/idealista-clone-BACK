import express from "express";
import { getPropertiesController } from "../controllers/propertiesControllers.js";

const propertiesRouter = express.Router();

propertiesRouter.get("/", getPropertiesController);

export default propertiesRouter;
