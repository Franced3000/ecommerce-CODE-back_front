import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './user';

interface OrderAttributes {
  id: number;
  userId: number;
  products: any;
  total: number;
  name: string;
  surname: string;
  address: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
  status?: string;
}

class Order extends Model<OrderAttributes, Optional<OrderAttributes, 'id'>>  implements OrderAttributes {
  public id!:number;
  public userId!: number;
  public products!: any;
  public total!: number;
  public name!: string;
  public surname!: string;
  public address!: string;
  public postalCode!: string;
  public city!: string;
  public region!: string;
  public country!: string;
  public status?: string;
}

Order.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: false,
    references: {
      model: User, 
      key: 'id'
    }
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'pending',
  }
}, {
  sequelize,
  tableName: 'orders'
});
Order.belongsTo(User, { foreignKey: 'userId' });

export default Order;
