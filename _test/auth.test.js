const request = require("supertest");
const app = require("../server");
const path = require("path");
const bcrypt = require("bcrypt");
const usersRepository = require("../repositories/usersRepository");

describe("POST /auth/login", () => {
  it("should response with 200 as status code", async () => {
    const rawPassword = "User12345";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const payloadCreateUser = {
      name: "User 1",
      role: "user",
      email: "user1@gmail.com",
      password: hashedPassword,
    }

    const createdUser = await usersRepository.create(payloadCreateUser)

    const payloadLogin = {
      email: payloadCreateUser.email,
      password: rawPassword
    }

    return request(app)
      .post("/auth/login")
      .send(payloadLogin)
      .set("Content-type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res._body.data.token).not.toEqual(null);

        // Delete Test Data
        usersRepository.delete({ id: createdUser.id });
      });
  });
});

describe("POST /auth/register", () => {
  it("should response with 201 as status code", async () => {
    // const filePath = path.join(__dirname, "../storages/.storage")

    const payload = {
      name: "User 2",
      role: "user",
      email: "user2@gmail.com",
      password: "User12345"
    }
    return request(app)
      .post("/auth/register")
      .field("name", payload.name)
      .field("role", payload.role)
      .field("email", payload.email)
      .field("password", payload.password)
      
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res._body.data.registered_user).not.toEqual(null);

        // Delete Test Data
        usersRepository.delete({ id: res._body.data.registered_user.id });
      });
  });
});