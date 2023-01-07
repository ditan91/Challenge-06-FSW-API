const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
const swaggerJsdoc = require('swagger-jsdoc')
const cors = require("cors");
const path = require("path");
const upload = require("./helpers/fileUpload");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//swagger
const swaggerOptions = require('./helpers/swaggerOption')
const swaggerSpec = swaggerJsdoc(swaggerOptions)

// Import Controllers
const carController = require("./controllers/carsController");
const authController = require("./controllers/authController")

// Import Midleware
const middleware = require("./middlewares/auth");

// Define Routes

// Auth
//for regis as user or superadmin
app.post("/auth/register", authController.register); 
//for add admin by superadmin
app.post("/auth/addAdmin", middleware.authenticate, middleware.isSuperadmin,authController.registerAdmin);
app.post("/auth/login", authController.login);
app.get("/auth/me", middleware.authenticate, authController.currUser);


// Product
app.get("/api/cars", middleware.authenticate, carController.getAll)
app.get("/api/cars/:id", middleware.authenticate, middleware.isAdmin, carController.getCarsByID)
app.post("/api/cars", middleware.authenticate, middleware.isAdmin, upload.single("photo"),carController.create)
app.put("/api/cars/:id", middleware.authenticate, middleware.isAdmin, carController.updateByID)
app.delete("/api/cars/:id", middleware.authenticate, middleware.isAdmin, carController.deleteByID)

// app.get("/api/cars", carController.getAll)
// app.get("/api/cars/:id", carController.getCarsByID)
// app.post("/api/cars", upload.single("photo"),carController.create)
// app.put("/api/cars/:id", carController.updateByID)
// app.delete("/api/cars/:id", carController.deleteByID)

//API doc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(process.env.PORT, () => {
  console.log(
    `Server berhasil berjalan di port http://localhost:${
      process.env.PORT
    }`
  );
});
module.exports = app