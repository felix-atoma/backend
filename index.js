import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import sequelize from "./config/database.js";
import User from "./models/User.js"; // Import User model

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ GET all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ POST Create a new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sync Database (Alter without dropping data)
sequelize.sync({ alter: true }) // Updates the table without deleting existing data
  .then(() => console.log("✅ Database synced"))
  .catch((err) => console.error("❌ Database sync failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
