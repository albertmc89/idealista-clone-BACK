import express from "express";
import {
  addPropertyController,
  deletePropertyByIdController,
  getPropertiesController,
  getPropertyByIdController,
} from "../controllers/propertiesControllers.js";

const propertiesRouter = express.Router();

propertiesRouter.get("/", getPropertiesController);
propertiesRouter.delete("/:idProperty", deletePropertyByIdController);
propertiesRouter.post("/", addPropertyController);
propertiesRouter.get("/:idProperty", getPropertyByIdController);

export default propertiesRouter;
