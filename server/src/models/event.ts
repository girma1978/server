import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface EventAttributes {
  id: number;
  title: string;
  description?: string;
  date: Date;
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
  public date!: Date;
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
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
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
