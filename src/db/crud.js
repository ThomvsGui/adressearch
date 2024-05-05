import { AddressModel } from "./models/AddressModel.js";

export const createAddress = async (values) => {
  console.log("values", values)
  const newAddress = new AddressModel(values);
  await newAddress.save();
  return newAddress;

};

export const readAddresses = async () => {
  return await AddressModel.find();
};

export const readAddress = async (addressId) => {
  return await AddressModel.findById(addressId);
};

export const updateAddress = async (addressId, updateData) => {
  const updatedAddress = await AddressModel.findByIdAndUpdate(addressId, updateData.addressData, {
    returnDocument: "after",
  });
  return updatedAddress;
};

export const deleteAddress = async (addressId) => {
  const deletedAddress = await AddressModel.findByIdAndDelete(addressId);
  return deletedAddress;
};
