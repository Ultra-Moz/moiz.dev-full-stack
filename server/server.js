require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const serviceRouter = require("./router/service-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET,POST,DELETE,HEAD,PUT,PATCH",
  credentials: true,
};
app.use(cors(corsOption));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRouter);

const PORT = 5000;

app.use(errorMiddleware);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
