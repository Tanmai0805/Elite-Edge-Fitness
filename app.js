import express from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { sendEmail } from "./utils/sendEmail.js";
import Plan from "./models/Plan.js"; // Import the Plan model

// Initialize the app
const app = express();

// Load environment variables
config({ path: "./config.env" });

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/gym", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if DB connection fails
  }
};
connectDB();

// Middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // Allow frontend URL during development
    methods: ["POST", "GET"], // Allow GET and POST requests
    credentials: true, // Allow cookies if required
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// 1. Route to handle form submissions for joining plans
app.post("/api/join", async (req, res) => {
  const { name, age, hoursInGym, plan, paymentMethod } = req.body;

  // Validate input
  if (!name || !age || !hoursInGym || !plan || !paymentMethod) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Save the form data in MongoDB
    const newPlan = new Plan({
      name,
      age,
      hoursInGym,
      plan,
      paymentMethod,
    });

    await newPlan.save();

    res.status(201).json({
      success: true,
      message: "Plan saved successfully",
    });
  } catch (error) {
    console.error("Error saving plan:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// 2. Route to send emails
app.post("/send/mail", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all details",
    });
  }

  try {
    await sendEmail({
      email: "merndeveloper34@gmail.com", // Your email address
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
    });
    res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Default Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong! Please try again later.",
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
