import { Providers } from "../models/index.js";

// get all providers
export const find = async () => {
  return Providers.find();
};

//post providers
export const save = async (providerObject) => {
  const newProvider = new Providers(providerObject);
  return newProvider.save();
};

//get one Provider by id
export const findOne = async (id) => {
  return Providers.findById(id);
};

//put (update) provider by ID
export const replace = async (query, body) => {
  return Providers.replaceOne(query, body);
};

export const saveProvider = async (query, body) => {
  return query.save();
};

//delete a provider
export const remove = async (query) => {
  return Providers.findByIdAndDelete(query);
};
export const updateUserDetailsById = (updatedUser) => {
  const user = Providers.findByIdAndUpdate(updatedUser.id, updatedUser, {
    new: true,
  }).exec();
  return user;
};
