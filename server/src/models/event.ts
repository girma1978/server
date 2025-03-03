import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface EventAttributes {
  id: number;
  title: string;
  description?: string;
  date: string | Date;  // Change to string | Date for flexibility
  time: string;
  location: string;
  organizerId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {}

export class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  public id!: number;
  public title!: string;
  public description?: string;
  public date!: string | Date;  // Change to string | Date for flexibility
  public time!: string;
  public location!: string;
  public organizerId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export function EventFactory(sequelize: Sequelize): typeof Event {
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true, // Ensure date is valid
        },
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          is: /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/, // Validate time format (24-hour format)
        },
      },
      location: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      organizerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Assumes the `users` table exists and has an `id` column
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      tableName: 'events',
      sequelize,
      underscored: true,
      timestamps: true,
    }
  );

  return Event;
}
