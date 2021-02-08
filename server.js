
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
//connectDB

connectDB();

//setup express
const app = express();
app.use(cors());
app.use(express.json());
//setup routes
app.use("/api/pauth", require("./routes/provider"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/provider/api/private", require("./routes/pprivate"));
app.use("/user",require("./routes/user"));
app.use("/admin",require("./routes/adminroute"));
app.use("/feedback",require("./routes/feedbackroute"));
app.use("/category",require("./routes/categoryroutes"));
app.use("/service",require("./routes/serviceroutes"));
app.use("/service/:id",require("./routes/serviceroutes"));
app.use("/order",require("./routes/orderroutes"));
//error handler
app.use(errorHandler);

const PORT = process.env.PORT || 9990;
const server = app.listen(PORT, () => console.log(`server started on ${PORT}`));
process.on("unhandledRejection",(err,Promise)=>{
    console.log(`Logged Error: ${err}`);
    server.close(()=> process.exit(1));
});


//setup mongoose

