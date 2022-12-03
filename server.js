const express = require("express");
const bodyParser = require("body-parser");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
const cors = require("cors");
const path = require("path");
const upload = require("./helpers/fileUpload");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

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
app.get("/api/car", middleware.authenticate, carController.getAll)
app.get("/api/car/:id", middleware.authenticate, middleware.isAdmin, carController.getCarsByID)
app.post("/api/car", middleware.authenticate, middleware.isAdmin, upload.single("photo"),carController.create)
app.put("/api/car/:id", middleware.authenticate, middleware.isAdmin, carController.updateByID)
app.delete("/api/car/:id", middleware.authenticate, middleware.isAdmin, carController.deleteByID)

app.listen(process.env.PORT || 9000, () => {
  console.log(
    `Server berhasil berjalan di port http://localhost:${
      process.env.PORT || 9000
    }`
  );
});