import mongoose from "mongoose"
import { addresSchema } from "../schemas/addresSchema"

export const AddressModel =
  mongoose.models.Address || mongoose.model("Address", addresSchema)
 