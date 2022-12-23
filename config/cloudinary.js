const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: "dbxwasjws",
    api_key: "473748799947793",
    api_secret: "PBJnQLe27fo3oDoGl4miE_vun7o",
    secure: true
});

module.exports = cloudinary;