const carRepository = require("../repositories/carsRepository");

class CarService {
  static async create({ name, price, size, photo, createdBy }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom nama tidak bole kosong",
          data: {
            name: null,
          },
        };
      }

      if (!price) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom Sewa per day tidak bole kosong",
          //   data: {
          //     price: null,
          //   },
        };
      }
      if (!size) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom ukuran tidak bole kosong",
          //   data: {
          //     price: null,
          //   },
        };
      }
      const createdCar = await carRepository.create({
        // id,
        name,
        price,
        size,
        photo,
        createdBy
      });

      return {
        status: true,
        status_code: 201,
        message: "Car created successfully",
        data: {
          created_Car: createdCar,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        // data: {
        //   registered_user: null,
        // },
      };
    }
  }

  static async deleteByID({ id, deletedAt, deletedBy }) {
    try {
      const getCar = await carRepository.getByID({ id });

      if (getCar.id == id) {
        const deletedCar = await carRepository.deleteByID({
          id,
          deletedAt,
          deletedBy
        });

        return {
          status: true,
          status_code: 200,
          message: "Car deleted successfully",
          data: {
            deleted_Car: deletedCar,
          },
        };
      } else {
        return {
          status: true,
          status_code: 401,
          message: "Resource Unauthorized",
          data: {
            deleted_Car: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        // data: {
        //   registered_user: null,
        // },
      };
    }
  }

  static async updateByID({ id, name, price, size, photo, updatedBy }) {
    try {
      const getCar = await carRepository.getByID({ id });

      if (getCar.id == id) {
        const updatedCar = await carRepository.updateByID({
          id,
          name,
          price,
          size,
          photo,
          updatedBy
        });

        return {
          status: true,
          status_code: 200,
          message: "Car updated successfully",
          data: {
            updated_Car: updatedCar
          },
        };
      } else {
        return {
          status: true,
          status_code: 401,
          message: "Resource Unauthorized",
          data: {
            updated_Car: null,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          registered_user: null,
        },
      };
    }
  }
  static async getCarsByID({ id }) {
    try {
      const getCars = await carRepository.getByID({
        id,
      });

      return {
        status: true,
        status_code: 200,
        message: "Success",
        data: {
          cars: getCars,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        // data: {
        //   registered_user: null,
        // },
      };
    }
  }
  static async getAll() {
    try {
      const getCars = await carRepository.getAll();

      return {
        status: true,
        status_code: 200,
        message: "Success",
        data: {
          cars: getCars,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        // data: {
        //   registered_user: null,
        // },
      };
    }
  }
}

module.exports = CarService;
