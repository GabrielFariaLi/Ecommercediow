const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
// No CORS Headder set
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/message.json");
});

// CORS header `Access-Control-Allow-Origin` set to accept all
app.get("/allow-cors", function (request, response) {
  response.set("Access-Control-Allow-Origin", "*");
  response.sendFile(__dirname + "/message.json");
});

//"app.use(cors(http://153.92.221.32));"
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(2424, () => {
  console.log("Backend server is running!");
});
