const authService = require("../services/authService");

const register = async (req, res, next) => {
  const { name, role, email, password } = req.body;
  const { status, status_code, message, data } = await authService.register({
    name,
    role,
    email,
    password,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};
const registerAdmin = async (req, res, next) => {
  const { name, role, email, password } = req.body;
  const { status, status_code, message, data } = await authService.createAdmin({
    name,
    role,
    email,
    password,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};
const currUser = async (req, res,next) => {
  const currUser = req.user;

  res.status(200).send({
    status: true,
    message: "Get current user success.",
    data: {
      user: currUser,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const { status, status_code, message, data } = await authService.login({
    email,
    password
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};
module.exports = { register, registerAdmin, currUser, login}