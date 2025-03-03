// models/user.js (or .ts)
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection'; // Adjust path

interface UserAttributes {
  id?: number; // Optional because it's auto-incremented
  username: string;
  password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id?: number;
  public username!: string;
  public password!: string;

  // Timestamps (optional, but common)
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export { User };