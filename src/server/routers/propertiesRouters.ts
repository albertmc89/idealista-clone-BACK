import express from "express";
import {
  deletePropertyByIdController,
  getPropertiesController,
} from "../controllers/propertiesControllers.js";

const propertiesRouter = express.Router();

propertiesRouter.get("/", getPropertiesController);
propertiesRouter.delete("/:idProperty", deletePropertyByIdController);

export default propertiesRouter;
