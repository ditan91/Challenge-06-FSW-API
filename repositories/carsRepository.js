const { Car } = require("../models");
const cloudinary = require("../helpers/cloudinary");

class CarsRepository {
  static async create({ name, price, size, photo }) {
    const { url } = await cloudinary.upload(photo)
    const createdCar = Car.create({
      name,
      price,
      size,
      photo:url
    });

    return createdCar;
  }

  static async getByID({ id }) {
    const getCar = await Car.findOne({ where: { id } });

    return getCar;
  }

  static async deleteByID({ id }) {
    const deletedCar = await Car.destroy({ where: { id } });

    return deletedCar;
  }

  static async updateByID({ id, name, price, size, photo }) {
    const updatedCar = await Car.update(
      {
        name,
        price,
        size,
        photo
      },
      { where: { id } }
    );

    return updatedCar;
  }
  static async getByID({ id }) {
    const getCar = await Car.findOne({ where: { id } });

    return getCar;
  }
  static async getAll() {
    const getAll = await Car.findAll();

    return getAll;
  }

}

module.exports = CarsRepository;