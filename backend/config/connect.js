const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/freelance")
    .then(
        () => {
            console.log("Database connected");
        }
    )
    .catch(
        (err) => {
            console.log(err);
        }
    )