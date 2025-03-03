import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface RsvpAttributes {
  id: number;
  userId: number;
  eventId: number;
  status: 'interested' | 'going' | 'not going';
  createdAt?: Date; // Not needed if you rely on Sequelize auto-generated timestamps
  updatedAt?: Date; // Not needed if you rely on Sequelize auto-generated timestamps
}

interface RsvpCreationAttributes extends Optional<RsvpAttributes, 'id'> {}

export class Rsvp
  extends Model<RsvpAttributes, RsvpCreationAttributes>
  implements RsvpAttributes
{
  public id!: number;
  public userId!: number;
  public eventId!: number;
  public status!: 'interested' | 'going' | 'not going';
  public createdAt!: Date;
  public updatedAt!: Date;
}

export function RsvpFactory(sequelize: Sequelize): typeof Rsvp {
  Rsvp.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.ENUM('interested', 'going', 'not going'),
        allowNull: false,
      },
    },
    {
      tableName: 'rsvps',
      sequelize,
      underscored: true,
      timestamps: true, // Sequelize will automatically handle createdAt and updatedAt
    }
  );

  return Rsvp;
}
