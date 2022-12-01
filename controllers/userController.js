const userService = require("../services/userService")

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
  
    const { status, status_code, message, data } = await usersService.delete({ id });
  
    res.status(status_code).send({
      status: status,
      message: message,
      data: data,
    });
};
module.exports = { deleteUser }