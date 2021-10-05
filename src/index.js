import app from "./server.js";
import mongoose from "mongoose";

const port = process.env.PORT || 3001;
const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("🍀 Connected to MongoDB");
    app.listen(port, () => {
      console.log("🤘 Server listening on port " + port);
    });
  });
