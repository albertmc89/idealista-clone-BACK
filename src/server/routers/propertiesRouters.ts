import express from "express";
import {
  addPropertyController,
  deletePropertyByIdController,
  getPropertiesController,
  getPropertyByIdController,
  modifyByIdController,
} from "../controllers/propertiesControllers.js";

const propertiesRouter = express.Router();

propertiesRouter.get("/", getPropertiesController);
propertiesRouter.delete("/:idProperty", deletePropertyByIdController);
propertiesRouter.post("/", addPropertyController);
propertiesRouter.get("/:idProperty", getPropertyByIdController);
propertiesRouter.patch("/:idProperty", modifyByIdController);

export default propertiesRouter;
