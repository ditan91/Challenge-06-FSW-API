const { User } = require("../models");

class userRepository {
  static async create({ name, role, email, password }) {
    const createUser = await User.create({
      name,
      role,
      email,
      password,
    });

    return createUser;
  }

  static async getUserByID({ id }) {
    const getUser = await User.findOne({ where: { id } });

    return getUser;
  }

  static async getUserByEmail({ email }) {
    const getUserwEmail = await User.findOne({ where: { email } });
    return getUserwEmail;
  }

  static async delete({ id }) {
    const deleteUser = await User.destroy({ where: { id } });

    return deleteUser;
  }
  static async getByROLE({ id }) {
    const getUser = await User.findOne(
      {
        where: {
          id: id,
          role: {
            [role.eq]: "superadmin",
          },
        },
      },
      { where: { id } }
    );

    return getUser;
  }
}
module.exports = userRepository;
