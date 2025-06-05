import express, { json, Request, Response } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectMongoDB from "./connectDb";
import usersRouter from "./routes/user";
import companyRouter from "./routes/company";
import reviewsRouter from "./routes/review";
import bookingRouter from "./routes/booking";
import categoryRouter from "./routes/category";
import { clerkMiddleware } from "@clerk/express";

const app = express();

configDotenv();

const port = process.env.PORT;

connectMongoDB();

app.use(cors());

app.use(json());

app.use("/user", usersRouter);
app.use("/company", companyRouter);
app.use("/review", reviewsRouter);
app.use("/booking", bookingRouter);
app.use("/category", categoryRouter);
app.use(clerkMiddleware());

app.get("/pp", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at PORT: ${port}`);
});
