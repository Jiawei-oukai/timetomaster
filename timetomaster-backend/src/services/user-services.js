import User from "../models/users.js";

export const search = async (params) => {
  const users = User.find(params).select("-password").exec();
  return users;
};

//create new reminder user
export const save = async (newUser) => {
  const user = new User(newUser);
  return user.save();
};

//get user by ID
export const getById = async (id) => {
  const user = User.findById(id).exec();
  return user;
};

//update user
export const update = async (id, updatedUser) => {
  const user = User.findByIdAndUpdate(id, updatedUser, {
    new: true,
  }).exec();
  return user;
};

//delete user
export const remove = async (id) => {
  const user = User.findByIdAndRemove(id).exec();
  return user;
};

//get user by username
export const getByUserName = async (userName) => {
  const user = User.findOne(userName).exec();
  return user;
};

