const sequelize=require('./DB_connection')
const User=require('./User_Schema')
const {DataTypes}=require('sequelize')
const Comment=sequelize.define('Comment',{
    text:{
        type:DataTypes.STRING
        ,allowNull:false
    },
    

})

User.hasMany(Comment,{as:'comments'})
Comment.belongsTo(User,{foreignKey:'UserId',as:"user" })
module.exports=Comment
