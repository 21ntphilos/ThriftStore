import { DataTypes, Model } from "sequelize";
import {db} from '../config/config'

export interface propertyAttributes {
  id: string;
  name: string;
  description: string;
  category:string;
  propertyType: string;
  readyTime: number;
  price: number;
  rating:number
  vendorId:string
  isSuspended:boolean
  image: string,
}

export class propertyInstance extends Model<propertyAttributes> {}

propertyInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category: {
          type:DataTypes.STRING,
          allowNull:false,
      },
      propertyType:{
          type:DataTypes.STRING,
          allowNull:true
      },
      
      readyTime:{
          type:DataTypes.NUMBER,
          allowNull:true
      },
      price:{
          type:DataTypes.NUMBER,
          allowNull:true
      },
      rating:{
          type:DataTypes.NUMBER,
          allowNull:true
      },

      vendorId:{
      type:DataTypes.UUIDV4,
      allowNull:true
  },
  isSuspended:{
    type:DataTypes.BOOLEAN,
    allowNull:true
},
image: {
  type: DataTypes.STRING,
  allowNull: true,
},
},

{
    sequelize:db,
    tableName:'property'
});
