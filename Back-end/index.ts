import express, { json } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectMongoDB from "./connectDb";
import usersRouter from "./routes/user";
import companyRouter from "./routes/company";
import reviewsRouter from "./routes/review";
import bookingRouter from "./routes/booking";
import categoryRouter from "./routes/category";
// import { clerkMiddleware } from "@clerk/express";

const app = express();
const publicRouter = express.Router();

configDotenv();

const port = process.env.PORT;

connectMongoDB();

app.use(cors());

app.use(json());

app.use("/category", categoryRouter);
app.get("/pp", (req, res) => {
  res.send("hello world");
});

app.use(publicRouter);

// app.use(clerkMiddleware());

app.use("/user", usersRouter);
app.use("/company", companyRouter);
app.use("/review", reviewsRouter);
app.use("/booking", bookingRouter);

app.listen(port, () => {
  console.log(`Server running at PORT: ${port}`);
});
