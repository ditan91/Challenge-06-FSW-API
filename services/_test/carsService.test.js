const carsService = require("../carsService");

describe("create car", () => {
  it("should create car to db", async () => {
    // Create payload
    const carToCreate = {
        name: "lamboyu",
        price: 1000,
        size: "Big",
        photo:
          "http://res.cloudinary.com/dbxwasjws/image/upload/v1673017877/fl2qy8ewrb2wlwltw16f.png",
    };

    // Expected Response
    const expectedCreatedcar = {
      id: 999,
      name: "lamboyu",
      price: 1000,
      size: "Big",
      photo:
        "http://res.cloudinary.com/dbxwasjws/image/upload/v1673017877/fl2qy8ewrb2wlwltw16f.png",
    };

    const expectedCreatedcarService = {
      status: true,
      status_code: 201,
      message: "car created successfully",
      data: {
        created_car: expectedCreatedcar,
      },
    };

    // Create service mock function
    const mockcarService = carsService;

    mockcarService.create = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCreatedcarService));
    
    const createdcarResponse = await mockcarService.create(carToCreate);

    // Assertion
    expect(expectedCreatedcarService.status).toEqual(
      createdcarResponse.status
    );
    expect(expectedCreatedcarService.status_code).toEqual(
      createdcarResponse.status_code
    );
    expect(expectedCreatedcarService.message).toEqual(
      createdcarResponse.message
    );
    expect(expectedCreatedcarService.data.created_car).toEqual(
      createdcarResponse.data.created_car
    );
  });
});