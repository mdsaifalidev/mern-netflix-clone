import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import verifyJwt from "./middlewares/auth.middleware.js";
import path from "path";
import "./utils/passport.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
import authRouter from "./routes/auth.route.js";
import movieRouter from "./routes/movie.route.js";
import tvRouter from "./routes/tv.route.js";
import searchRouter from "./routes/search.route.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movies", verifyJwt, movieRouter);
app.use("/api/v1/tv", verifyJwt, tvRouter);
app.use("/api/v1/search", verifyJwt, searchRouter);

// error handler
import errorHandler from "./middlewares/error.middleware.js";

app.use(errorHandler);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// connect to the database
import connectDB from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error connecting to the database: ${error.message}`);
  });
