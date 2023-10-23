require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const goalRouter = require('./routes/goalRouter')

//middleware
app.use(express.json());

//routes
app.use('/api/goals', goalRouter)

//db connection
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'goals',
    });
    app.listen(PORT, () => {
      console.log(`server running on port : ${PORT}..`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();

//error route
app.use((req, res) => {
  res.status(404).json({ success: false, msg: "Resource not found" });
});