import { Schema, model } from "mongoose";
import { type PropertyStructure } from "../../types";

const playerSchema = new Schema<PropertyStructure>({
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  meters: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  parking: {
    type: Boolean,
    required: true,
  },
  elevator: {
    type: Boolean,
    required: true,
  },
  heating: {
    type: Boolean,
    required: true,
  },
  aircon: {
    type: Boolean,
    required: true,
  },
  consumption: {
    type: Number,
    required: true,
  },
  emissions: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  image3: {
    type: String,
    required: true,
  },
  image4: {
    type: String,
    required: true,
  },
  image5: {
    type: String,
    required: true,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  user: {
    type: String,
    ref: "User",
    required: true,
  },
});

const Player = model("Player", playerSchema, "players");

export default Player;
