import sequelize from '../config/config.js';
import { DataTypes } from 'sequelize';
const userInfo = sequelize.define("userInfo",{
    row_id  : { 
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
        
     },
     username : {
        type:DataTypes.STRING,
        allowNull:true
     },
     mail:{
        type:DataTypes.STRING,
        allowNull:true,
        unique:true
     },
     password:{
        type:DataTypes.STRING,
        allowNull:true
     },
     mblnumber:{
        type:DataTypes.STRING,
        allowNull:true,
        unique:true
     },
     last_otp:{
        type:DataTypes.STRING,
        allowNull:true
     },
     verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
     },
     verificationToken:{
        type:DataTypes.STRING,
        allowNull:true
     }


},{
    tableName : "userInfo",
    timeframe :false
})

   
export default userInfo
