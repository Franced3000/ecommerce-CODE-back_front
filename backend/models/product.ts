import { DataTypes, Model} from 'sequelize';
import  sequelize  from '../config/db'; // Assicurati che il percorso sia corretto
import Category from './category';
// Definizione degli attributi del prodotto
interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  category: any;
}


// Definizione del modello Product
class Product extends Model<ProductAttributes>  


  implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public category!: object;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category :{
    type:DataTypes.INTEGER.UNSIGNED,
   references: {
    model:Category,
    key:'id'
   }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Product',
    timestamps: true,
  }
);

Product.hasOne(Category, { foreignKey: 'id' });
Category.hasMany(Product, { foreignKey: 'id' });


export default Product;
