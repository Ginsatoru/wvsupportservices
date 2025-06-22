// Environment setup - MUST BE AT THE VERY TOP
require("dotenv").config({ path: __dirname + "/.env" });
console.log("Environment variables loaded:", {
  MONGO_URI: process.env.MONGO_URI ? "*****" : "NOT FOUND",
  JWT_SECRET: process.env.JWT_SECRET ? "*****" : "NOT FOUND",
  PORT: process.env.PORT || "5000 (default)",
});

// Core dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const path = require("path");

// Security and authentication
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Models
const User = require("./models/User");
const Message = require("./models/Message");

// Routes
const settingsRouter = require("./routes/settings");
const authRouter = require("./routes/auth");

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);


// Database Configuration
const FALLBACK_URI = "mongodb://127.0.0.1:27017/wv-support";
const connectionURI = process.env.MONGO_URI || FALLBACK_URI;

// ======================
// MIDDLEWARE
// ======================
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// DATABASE CONNECTION
// ======================
const connectDB = async () => {
  try {
    console.log(`Attempting to connect to MongoDB with URI: ${connectionURI}`);
    await mongoose.connect(connectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// ======================
// ROUTES
// ======================

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Backend is working!" });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date(),
    dbStatus: mongoose.connection.readyState,
  });
});

// ======================
// Initialize Socket.IO
// ======================
const SocketServer = require("./utils/socket");
const socketServer = new SocketServer(server);
socketServer.initialize();
app.set("socket", socketServer); // Make accessible in routes

// ======================
// Mount routers
// ======================
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/settings", settingsRouter);
app.use("/api/auth", authRouter);

// ======================
// MESSAGE ENDPOINTS
// ======================

// Create new message
app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const newMessage = await Message.create({
      name,
      email: email || "naibo2002@gmail.com",
      content,
      createdAt: new Date(),
    });

    // Notify WebSocket clients
    wss.broadcast({
      type: "new_message",
      message: newMessage,
    });

    res.status(201).json({ success: true, message: newMessage });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all messages (admin only)
app.get("/api/messages", async (req, res) => {
  try {
    // Verify admin token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .select("_id email content createdAt");

    res.json({
      success: true,
      messages: messages.map((msg) => ({
        _id: msg._id,
        email: msg.email,
        content: msg.content,
        createdAt: msg.createdAt,
      })),
    });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

// Admin reply to message
app.post("/api/messages/:id/reply", async (req, res) => {
  try {
    // Verify admin token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin)
      return res.status(403).json({ message: "Admin access required" });

    const { content } = req.body;
    if (!content)
      return res.status(400).json({ message: "Reply content is required" });

    const originalMessage = await Message.findById(req.params.id);
    if (!originalMessage)
      return res.status(404).json({ message: "Original message not found" });

    const reply = await Message.create({
      content,
      isAdminReply: true,
      originalMessage: req.params.id,
      name: "Admin",
      email: decoded.email,
    });

    await Message.findByIdAndUpdate(req.params.id, {
      $push: { replies: reply._id },
      $set: { updatedAt: new Date() },
    });

    wss.broadcast({
      ...reply.toObject(),
      type: "admin_reply",
      time: new Date().toLocaleTimeString(),
    });

    res.json({ success: true, message: reply });
  } catch (err) {
    console.error("Reply error:", err);

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// Delete message (admin only)
app.delete("/api/messages/:id", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin)
      return res.status(403).json({ message: "Admin access required" });

    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage)
      return res.status(404).json({ message: "Message not found" });

    res.json({ success: true, message: "Message deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// ADMIN AUTHENTICATION
// ======================

// Admin login
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  // Temporary hardcoded admin (remove in production)
  if (email === "admin@wvsupport.com" && password === "!@#aaapos") {
    const token = jwt.sign(
      { id: "admin-id", email, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    if (!user.isAdmin)
      return res.status(403).json({ message: "Admin access required" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ======================
// ERROR HANDLING
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

// ======================
// SERVER STARTUP
// ======================
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`Admin login: http://localhost:${PORT}/api/admin/login`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
};

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  wss.shutdown();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

// Start the server
startServer();
