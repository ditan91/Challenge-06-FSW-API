const request = require("supertest");
const app = require("../server");
const path = require("path");
const bcrypt = require("bcrypt");
const carsRepository = require("../repositories/carsRepository");


describe("POST /api/cars", () => {
    
  it("should response with 200 as status code", async () => {
    
    const payloadCreateCar = {
        name: "lamboyu",
        price: 1000,
        size: "Big",
        photo:
          "http://res.cloudinary.com/dbxwasjws/image/upload/v1673017877/fl2qy8ewrb2wlwltw16f.png",
      }

    const createdCar = await carsRepository.create(payloadCreateCar)

    return request(app)
      .post("/api/cars")
      .send(payloadCreateCar)
      .set("Content-type", "application/json")
      .then((res) => {
        console.log(res._body.data)
        console.log(res.statusCode)
        expect(res.statusCode).toBe(201);
        expect(res._body.data.token).not.toEqual(null);

        // Delete Test Data
        carsRepository.delete({ id: createdCar.id });
      });
  });
});