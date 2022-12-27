import {DataTypes, Model} from 'sequelize'
import {db} from '../config/config'

export interface UserAttribute{
    id: string;
    email:string;
    password:string;
    firstName:string;
    lastName: string;
    salt: string;
    address: string;
    phone: string;
    otp: number;
    otp_expiry:Date;
    verified: boolean;
    role: string;
    isSuspended:boolean
}

export class UserInstance extends Model<UserAttribute>{}

UserInstance.init({
    id:{
        type:DataTypes.UUID,
        primaryKey: true,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate:{
            notNull:{
                msg:"An Email Address is Needed"
            },
            isEmail:{
                msg:" please provide a valid Email"
            } 
        }
    },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notNull:{
                    msg:"password is Needed"
                },
                notEmpty:{
                    msg:"Please provide a password"
                }
            }
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        salt:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        address:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notNull:{
                    msg:"Phone number is Needed"
                },
                notEmpty:{
                    msg:"Please provide a Phone number "
                }
            }
        },
        otp:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                notNull:{
                    msg:"OTP is Needed"
                },
                notEmpty:{
                    msg:"Please provide a OTP "
                }
            }
        },
        otp_expiry:{
            type:DataTypes.DATE,
            allowNull:false,
            validate:{
                notNull:{
                    msg:"OTP is Expired"
                },
            }
        },
        verified:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            validate:{
                notNull:{
                    msg:"User must be verified",
                }, 
                notEmpty:{
                    msg:"User not Verified"
                }
        }
    },
    role:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    isSuspended:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }
},

{ 
   sequelize: db,
   tableName: 'user' 
})


