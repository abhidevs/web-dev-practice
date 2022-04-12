const User = require("../models/user");

exports.getUsers = (req, res, next) => {
  console.log(req.url);
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((err) => console.log(err));
};

exports.addNewUser = (req, res, next) => {
  const { name, email, phone } = req.body;

  User.create({ name, email, phone })
    .then((user) => res.status(201).json(user))
    .catch((err) => console.log(err));
};

exports.updateUser = (req, res, next) => {
  const { userId } = req.params;
  const { name, email, phone } = req.body;

  User.findByPk(userId)
    .then((user) => {
      user.name = name;
      user.email = email;
      user.phone = phone;
      return user.save();
    })
    .then((user) => res.status(200).json(user))
    .catch((err) => console.log(err));
};

exports.deleteUser = (req, res, next) => {
  const { userId } = req.params;

  User.findByPk(userId)
    .then((user) => user.destroy())
    .then(() => res.status(200).json("User deleted successfully"))
    .catch((err) => console.log(err));
};
