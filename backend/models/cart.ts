import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './user';

interface CartAttributes {
  id:number;
  userId: number;
  products: any;
  total: number; 
}

class Cart extends Model<CartAttributes, Optional<CartAttributes, 'id'>> implements CartAttributes {
  public id!: number;
  public userId!: number;
  public products!: any;
  public total!: number;
}

Cart.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
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
  }
}, {
  sequelize,
  tableName: 'carts',
  timestamps: false
});
Cart.belongsTo(User, { foreignKey: 'userId' });

export default Cart;
