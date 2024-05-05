import { Schema } from "mongoose";

export const addresSchema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  restaurantType: {
    type: String,
  },
  stars: {
    type: Number,
    min: 1,
    max: 3,
  },
  price: {
    type: Number,
    min: 1,
    max: 5,
  },
  barType: {
    type: String,
  },
  parkType: {
    type: String,
    default: false,
  },
  publicOrPrivate: {
    type: Boolean,
  },

  museumArtType: {
    type: String,
  },
  isPaid: {
    type: Boolean,
  },
  museumAndParkPrice: {
    type: Number,
  },
  realMuseumAndParkPrice: {
    type: Number,
  },
  currentArtStyle: {
    type: String,
  },
});
