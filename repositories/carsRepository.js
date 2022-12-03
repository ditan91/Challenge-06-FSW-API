const { Car } = require("../models");
const cloudinary = require("../helpers/cloudinary");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class CarsRepository {
  static async create({ name, price, size, photo, createdBy }) {
    const { url } = await cloudinary.upload(photo);
    const createdCar = await Car.create({
      name,
      price,
      size,
      photo: url,
      createdBy,
    });

    return createdCar;
  }

  static async getByID({ id }) {
    const getCar = await Car.findOne({ where: { id } });

    return getCar;
  }

  static async deleteByID({ id, deletedBy }) {
    const deletedCar = await Car.update(
      { deletedAt: new Date(), deletedBy },
      { where: { id } }
    );

    return deletedCar;
  }

  static async updateByID({ id, name, price, size, photo, updatedBy }) {
    const updatedCar = await Car.update(
      {
        name,
        price,
        size,
        photo,
        updatedBy,
      },
      { where: { id } }
    );

    return updatedCar;
  }
  static async getByID({ id }) {
    const getCar = await Car.findOne(
      {
        where: {
          id:id,
          deletedAt: {
            [Op.eq]: null,
          },
        },
      },
      { where: { id } }
    );

    return getCar;
  }
  static async getAll() {
    const getAll = await Car.findAll({
      where: {
        deletedAt: {
          [Op.eq]: null,
        },
      },
    });

    return getAll;
  }
}

module.exports = CarsRepository;
