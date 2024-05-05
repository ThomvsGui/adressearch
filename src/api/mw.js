import mongoose from "mongoose"

export const mw = (handle) => async (req, res) => {
  try {

    await mongoose.connect("mongodb://127.0.0.1:27017/address")

    await handle(req, res)
  } finally {
    await mongoose.disconnect()
  }
}
