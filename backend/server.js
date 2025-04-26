const express = require("express");
require('./config/connect');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());



const userRoute = require("./routes/user.route");
const serviceRoute = require("./routes/service.route");
const proposalRoute = require("./routes/proposal.route");


app.use("/users", userRoute);
app.use("/services", serviceRoute);
app.use("/proposals", proposalRoute);


app.get("/", (req, res) => { res.send("Hello!");});

app.use("/images", express.static("./public"));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

