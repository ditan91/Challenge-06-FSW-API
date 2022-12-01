const userRepository = require("../repositories/userRepository")

class userService{
    
    static async delete({ id }){
        try {
            const getID = await userRepository.getDataById({ id })
            if (getID.id == id){
                const deleteProduct = await userRepository.delete({ 
                    id 
                })
                return {
                    status: true,
                    status_code: 201,
                    message: "Data berhasil dihapus",
                    data: {
                        deletedProduct:deleteProduct
                    }
                }
            } else {
                return {
                    status: true,
                    status_code: 401,
                    message: "Resource Unauthorized",
                    data: {
                        deletedProduct: null
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
}
module.exports = userService;