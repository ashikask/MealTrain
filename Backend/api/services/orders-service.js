import { Orders } from "./../models/index.js";

export const find = async (query) => {
  return Orders.find(query);
};

export const postOrder = async (order) => {
  const newOrder = new Orders(order);
  return newOrder.save();
};

//find orders by ID
export const findOne = async (id) => {
  return Orders.findById(id);
};

//delete order by ID
export const remove = async (id) => {
  return Orders.deleteOne({ _id: id });
};

//update order by ID
export const update = async (id, replacementObject) => {
  return Orders.findOneAndReplace({ _id: id }, replacementObject);
};
