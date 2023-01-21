import { Students } from "../models/index.js";

//get one Student by id
export const findOne = async (id) => {
  return Students.findById(id);
};

// get all students
export const find = async () => {
  return Students.find();
};

//post cart
export const save = async (studentObj) => {
  const newStudent = new Students(studentObj);
  return newStudent.save();
};

//put (update) student by ID
export const replace = async (query, body) => {
  return Students.replaceOne(query, body);
};

export const saveStudent = async (query, body) => {
  return query.save();
};

//delete a student
export const remove = async (query) => {
  return Students.findByIdAndDelete(query);
};

export const updateUserDetailsById = (updatedUser) => {
  const user = Students.findByIdAndUpdate(updatedUser.id, updatedUser, {
    new: true,
  }).exec();
  return user;
};
