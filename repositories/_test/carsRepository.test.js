const carsRepository = require("../carsRepository");

describe("create cars", () => {
  it("should create cars to db", async () => {
    const carsToCreate = {
      name: "lamboyu",
      price: 1000,
      size: "Big",
      photo:
        "http://res.cloudinary.com/dbxwasjws/image/upload/v1673017877/fl2qy8ewrb2wlwltw16f.png",
    };

    const createdcars = await carsRepository.create(carsToCreate);

    // Assertion
    // expect(createdcars.id).toEqual(carsToCreate.id);
    expect(createdcars.name).toEqual(carsToCreate.name);
    expect(createdcars.price).toEqual(carsToCreate.price);
    expect(createdcars.size).toEqual(carsToCreate.size);
    expect(createdcars.photo).toEqual(carsToCreate.photo);

    // Delete Test Data
    await carsRepository.deleteByID({ id: createdcars.id });
  });
});

describe("get cars by id", () => {
  it("should get cars from db", async () => {
    // Create Data
    const carsToCreate = {
      name: "lamboyu(2)",
      price: 1000,
      size: "Big",
      photo:
        "http://res.cloudinary.com/dbxwasjws/image/upload/v1673017877/fl2qy8ewrb2wlwltw16f.png",
    };

    const createdcars = await carsRepository.create(carsToCreate);
    const cars = await carsRepository.getByID({ id: createdcars.id });

    // expect(cars.user_id).toEqual(createdcars.user_id); #example
    expect(cars.id).toEqual(createdcars.id);
    expect(cars.name).toEqual(createdcars.name);
    expect(cars.price).toEqual(createdcars.price);
    expect(cars.size).toEqual(createdcars.size);
    expect(cars.photo).toEqual(createdcars.photo);

    // Delete Test Data
    await carsRepository.deleteByID({ id: createdcars.id });
  });
});

describe("update cars by id", () => {
  it("should get cars from db", async () => {
    // Create Data
    const carsToCreate = {
      name: "lamboyu(2)",
      price: 1000,
      size: "Big",
      photo:
        "http://res.cloudinary.com/dbxwasjws/image/upload/v1673017877/fl2qy8ewrb2wlwltw16f.png",
    };

    const createdcars = await carsRepository.create(carsToCreate);
    const getcars = await carsRepository.getByID({ id: createdcars.id });
    const cars = await carsRepository.updateByID(
      { id: getcars.id },
      {
        name: "lamboyu(updated)",
        price: 1001,
        size: "Small",
        photo:
          "http://res.cloudinary.com/dbxwasjws/image/upload/v1673017877/fl2qy8ewrb2wlwltw16f.png",
      }
    );
    // expect(createdcars.name).toEqual(cars.name);
    // expect(carsToCreate.name).toBe(cars.name);
    // expect(cars.price).toEqual(createdcars.price);
    // expect(cars.size).toEqual(createdcars.size);
    // expect(cars.photo).toEqual(createdcars.photo);

    // Delete Test Data
    await carsRepository.deleteByID({ id: createdcars.id });
  });
});

describe("get all cars", () => {
  it("should get cars from db", async () => {
    // Create Data
    const carsToCreate = {
      name: "lamboyu(2)",
      price: 1000,
      size: "Big",
      photo:
        "http://res.cloudinary.com/dbxwasjws/image/upload/v1673017877/fl2qy8ewrb2wlwltw16f.png",
    };

    const createdcars = await carsRepository.create(carsToCreate);
    const cars = await carsRepository.getAll();

    // Delete Test Data
    await carsRepository.deleteByID({ id: createdcars.id });
  });
});
