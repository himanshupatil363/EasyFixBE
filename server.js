const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
//setup express
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 9990;
console.log("Starting server");
app.listen(PORT, () => console.log(`server started on ${PORT}`));
//setup routes
app.use("/user", require("./routes/userroutes"));
app.use("/provider", require("./routes/providerroutes"));
app.use("/admin", require("./routes/adminroutes"));
//setup mongoose
console.log("connecting MongoDB");
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true,}, (err) => {
    if(err) return console.error(err);
    console.log("MongoDB connection established...............");
});