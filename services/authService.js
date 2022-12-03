const userRepository = require("../repositories/usersRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT } = require("../lib/const");
const SALT_ROUND = 10;

//Register dan Login
class authService {
  static async register({ name, role, email, password }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom nama tidak boleh kosong",
          data: {
            name: null,
          },
        };
      }
      if (!role) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom role tidak boleh kosong",
          data: {
            role: null,
          },
        };
      }
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom email tidak boleh kosong",
          data: {
            email: null,
          },
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom password tidak boleh kosong",
          data: {
            password: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "Password kurang dari 8 karakter",
          data: {
            password: "Password kurang dari 8 karakter",
          },
        };
      }

      if (role === "user" || role === "superadmin") {
        const getUserByEmail = await userRepository.getUserByEmail({ email });

        if (!getUserByEmail) {
          const hashedPass = await bcrypt.hash(password, SALT_ROUND);
          const createdUser = await userRepository.create({
            name,
            role,
            email,
            password: hashedPass,
          });
          if (role === "user"){
            return {
              status: true,
              status_code: 201,
              message: "Selamat anda berhasil registrasi",
              data: {
                registered_user: createdUser,
              },
            };
          } else if (role === "superadmin"){
            return {
              status: true,
              status_code: 201,
              message: "Selamat anda berhasil ditambahkan sebagai Superadmin",
              data: {
                registered_user: createdUser,
              },
            };
          }
          
        } else {
          return {
            status: false,
            status_code: 400,
            message: "Email sudah digunakan",
            data: {
              registered_user: null,
            },
          };
        }
      } else {
        return {
          status: false,
          status_code: 400,
          message: "admin hanya bisa ditambahkan oleh superadmin, silahkan login sebagai superadmin",
          data: {
            registered_user: null,
          },
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async createAdmin({ name, role, email, password }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom nama tidak boleh kosong",
          data: {
            name: null,
          },
        };
      }
      if (!role) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom role tidak boleh kosong",
          data: {
            role: null,
          },
        };
      }
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom email tidak boleh kosong",
          data: {
            email: null,
          },
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom password tidak boleh kosong",
          data: {
            password: null,
          },
        };
      } else if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "Password kurang dari 8 karakter",
          data: {
            password: "Password kurang dari 8 karakter",
          },
        };
      }

      if (role === "admin") {
        const getUserByEmail = await userRepository.getUserByEmail({ email });

        if (!getUserByEmail) {
          const hashedPass = await bcrypt.hash(password, SALT_ROUND);
          const createdUser = await userRepository.create({
            name,
            role,
            email,
            password: hashedPass,
          });

          return {
            status: true,
            status_code: 201,
            message: "Admin berhasil ditambahkan",
            data: {
              registered_user: createdUser,
            },
          };
        } else {
          return {
            status: false,
            status_code: 400,
            message: "Email sudah digunakan",
            data: {
              registered_user: null,
            },
          };
        }
      } else {
        return {
          status: false,
          status_code: 400,
          message: "role yang anda isi salah",
          data: {
            registered_user: null,
          },
        };
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          registered_user: null,
        },
      };
    }
  }

  static async login({ email, password }) {
    try {
      if (!email) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom email tidak boleh kosong",
          data: {
            email: null,
          },
        };
      }
      if (!password) {
        return {
          status: false,
          status_code: 400,
          message: "Kolom password tidak boleh kosong",
          data: {
            password: null,
          },
        };
      }
      if (password.length < 8) {
        return {
          status: false,
          status_code: 400,
          message: "Password kurang dari 8 karakter",
          data: {
            password: message,
          },
        };
      }

      const getUserByEmail = await userRepository.getUserByEmail({ email });

      if (!getUserByEmail.password) {
        return {
          status: false,
          status_code: 400,
          message: "Password atau email anda salah",
          data: {
            password: null,
          },
        };
      }
      if (!getUserByEmail) {
        return {
          status: false,
          status_code: 400,
          message: "Email yang digunakan belum terdaftar",
          data: {
            email: null,
          },
        };
      } else {
        const isPasswordMatch = await bcrypt.compare(
          password,
          getUserByEmail.password
        );

        if (isPasswordMatch) {
          const token = jwt.sign(
            {
              id: getUserByEmail.id,
              email: getUserByEmail.email,
            },
            JWT.SECRET,
            {
              expiresIn: JWT.EXPIRED,
            }
          );

          return {
            status: true,
            status_code: 200,
            message: "User berhasil login",
            data: {
              token,
            },
          };
        } else {
          return {
            status: false,
            status_code: 400,
            message: "Password salah",
            data: {
              user: null,
            },
          };
        }
      }
    } catch (error) {
      return {
        status: false,
        status_code: 500,
        message: error.message,
        data: {
          registered_user: null,
        },
      };
    }
  }
}
module.exports = authService;
