// ==========================
// SERVER ENTRY POINT
// ==========================

// 1️⃣ Load environment variables first
const dotenv = require("dotenv");
dotenv.config(); // Now process.env variables are available

// 2️⃣ Import core modules
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// 3️⃣ Import config & routes
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");

// 4️⃣ Initialize express app
const app = express();

// 5️⃣ Port from .env
const PORT = process.env.PORT || 4000;

// 6️⃣ Connect to database
database.connect();

// 7️⃣ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // Allow all origins (change for production)
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// 8️⃣ Connect Cloudinary
cloudinaryConnect();

// 9️⃣ Setup routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// 10️⃣ Test route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// 11️⃣ Start server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
