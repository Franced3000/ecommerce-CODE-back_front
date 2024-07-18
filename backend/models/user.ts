import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

interface UserAttributes {
    id:number;
    name: string;
    email:string;
    password: string;
    role: string;
}
class User extends Model<UserAttributes> implements UserAttributes {
  public id!:number;
  public name!: string;
  public email!: string;    
  public password!: string;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
{
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false,
  }
);

export default User;
