const carsService = require("../services/carsService");

const create = async (req, res, next) => {
  const { name, price, size } = req.body;
  const { status, status_code, message, data } = await carsService.create({
    name,
    price,
    size,
    photo: req.file,
    createdBy: req.user.id,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const deleteByID = async (req, res, next) => {
  const { id } = req.params;

  //   const user_id = req.user.id;

  const { status, status_code, message, data } = await carsService.deleteByID({
    id,
    deletedBy: req.user.id,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const updateByID = async (req, res, next) => {
  const { id } = req.params;
  const { name, price, size } = req.body;

  //   const user_id = req.user.id;

  const { status, status_code, message, data } = await carsService.updateByID({
    id,
    name,
    price,
    size,
    photo: req.uploaded_picture,
    updatedBy: req.user.id
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};
const getCarsByID = async (req, res, next) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await carsService.getCarsByID({
    id,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};
const getAll = async (req, res, next) => {
  const { status, status_code, message, data } = await carsService.getAll();

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};
module.exports = { create, updateByID, deleteByID, getCarsByID, getAll };
