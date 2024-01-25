const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const TextRoutes = require("./routes/TextRoutes.js");
const ImageRoutes = require("./routes/ImageRoutes.js");
const UserRoutes = require("./routes/UserRoutes.js");
const PaymentRoutes = require("./routes/PaymentRoutes.js");


mongoose.connect(process.env.MONGO_URL);


app.use("/api", TextRoutes);
app.use("/api", ImageRoutes);
app.use("/api", UserRoutes);
app.use("/api", PaymentRoutes);


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`)
})