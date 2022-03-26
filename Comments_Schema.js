const sequelize=require('./DB_connection')
const User=require('./User_Schema')
const {DataTypes}=require('sequelize')
const Comment=sequelize.define('Comment',{
    text:{
        type:DataTypes.STRING
        ,allowNull:false
    },
    

})

User.hasMany(Comment,{as:'comments'})    //Add id of user in UserId coloumn of comment
Comment.belongsTo(User,{as:"user" ,targetKey:'id'})  //Reverse technique to get user of comment by comparing UserId with id of User table 
module.exports=Comment
