import express, { json } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectMongoDB from "./connectDb";
import usersRouter from "./routes/user";
import companyRouter from "./routes/company";
import reviewsRouter from "./routes/review";
import bookingRouter from "./routes/booking";

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

app.get("/pp", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at PORT: ${port}`);
});
