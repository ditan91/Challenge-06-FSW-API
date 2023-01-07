const usersRepository = require("../usersRepository");

describe("create users", () => {
  it("should create users to db", async () => {
    const usersToCreate = {
        name: "ditan",
        role: "superadmin",
        email: "ditan19@gmail.com",
        password: "ditan1234",
    };

    const createdusers = await usersRepository.create(usersToCreate);

    // Assertion
    // expect(createdusers.id).toEqual(usersToCreate.id);
    expect(createdusers.name).toEqual(usersToCreate.name);
    expect(createdusers.role).toEqual(usersToCreate.role);
    expect(createdusers.email).toEqual(usersToCreate.email);
    expect(createdusers.password).toEqual(usersToCreate.password);

    // Delete Test Data
    await usersRepository.delete({ id: createdusers.id });
  });
});

describe("get users by id", () => {
  it("should get users from db", async () => {
    // Create Data
    const usersToCreate = {
        name: "ditan",
        role: "superadmin",
        email: "ditan19@gmail.com",
        password: "ditan1234",
    };

    const createdusers = await usersRepository.create(usersToCreate);
    const users = await usersRepository.getUserByID({ id: createdusers.id });

    // expect(users.user_id).toEqual(createdusers.user_id); #example
    expect(users.id).toEqual(createdusers.id);
    expect(users.name).toEqual(createdusers.name);
    expect(users.role).toEqual(createdusers.role);
    expect(users.email).toEqual(createdusers.email);
    expect(users.password).toEqual(createdusers.password);

    // Delete Test Data
    await usersRepository.delete({ id: createdusers.id });
  });
});


