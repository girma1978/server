import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Hash the password before saving the user
  public static async setPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  // Compare plain password with hashed password
  public static async validatePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
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
        validate: {
          notEmpty: { msg: 'Username is required' },
          len: [3, 30], // Optional: Length validation for username
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure emails are unique
        validate: {
          notEmpty: { msg: 'Email is required' },
          isEmail: { msg: 'Please enter a valid email' }, // Email format validation
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Password is required' },
          len: [8, 100], // Optional: Minimum password length validation
        },
      },
    },
    {
      tableName: 'users',
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          // Hash password before saving it
          user.password = await User.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          // Hash password before updating it
          if (user.changed('password')) {
            user.password = await User.setPassword(user.password);
          }
        },
      },
      timestamps: true, // Timestamps managed by Sequelize
    }
  );

  return User;
}
