import express from "express";
import {
  addPropertyController,
  deletePropertyByIdController,
  getPropertiesController,
} from "../controllers/propertiesControllers.js";

const propertiesRouter = express.Router();

propertiesRouter.get("/", getPropertiesController);
propertiesRouter.delete("/:idProperty", deletePropertyByIdController);
propertiesRouter.post("/", addPropertyController);

export default propertiesRouter;
