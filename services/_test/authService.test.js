const authsService = require("../authService");

describe("create auth", () => {
  it("should create auth to db", async () => {
    // Create payload
    const authToCreate = {
        name: "auth 2",
        role: "auth",
        email: "auth90@gmail.com",
        password: "auth12345"    
    };

    // Expected Response
    const expectedCreatedauth = {
      id: 999,
      name: "auth 2",
      role: "auth",
      email: "auth90@gmail.com",
      password: "auth12345"
    };

    const expectedCreatedauthService = {
      status: true,
      status_code: 201,
      message: "auth created successfully",
      data: {
        created_auth: expectedCreatedauth,
      },
    };

    // Create service mock function
    const mockauthService = authsService;

    mockauthService.create = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCreatedauthService));
    
    const createdauthResponse = await mockauthService.create(authToCreate);

    // Assertion
    expect(expectedCreatedauthService.status).toEqual(
      createdauthResponse.status
    );
    expect(expectedCreatedauthService.status_code).toEqual(
      createdauthResponse.status_code
    );
    expect(expectedCreatedauthService.message).toEqual(
      createdauthResponse.message
    );
    expect(expectedCreatedauthService.data.created_auth).toEqual(
      createdauthResponse.data.created_auth
    );
  });
});