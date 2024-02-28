import { Schema, model } from "mongoose";

const propertySchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  type: {
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
    type: String,
    required: true,
  },
  elevator: {
    type: String,
    required: true,
  },
  heating: {
    type: String,
    required: true,
  },
  aircon: {
    type: String,
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
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Property = model("Property", propertySchema, "properties");

export default Property;
