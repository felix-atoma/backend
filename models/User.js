import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Import the database instance

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // Ensure password is required
  },
});

export default User;
