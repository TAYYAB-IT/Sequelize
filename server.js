const express = require("express");
const app = express();
app.use(express.json());
const db = require("./DB_connection");
const User=require('./User_Schema')
const Comment=require('./Comments_Schema')
// start db
db.authenticate()
  .then((result) => {
    console.log("Connection established.");
  })
  .catch((error) => {
    console.log("Unable to connect to db: ", error);
  });

// start app
//Insert a new Record
app.post('/user',async(req,res)=>{
  //console.log(req.body)
  try{
  await db.sync();
 await User.create({name:req.body.Name,email:req.body.Email}).then(result=>{
res.json(result);
  })}
  catch(err){
      res.json(err);
  }
})
// All Users Data
app.get('/user',async(req,res)=>{
  await db.sync();
  const all_users=await User.findAll({attributes:['id','name','email'],include:["comments"]})
  return res.send(all_users);
})
//Selective user
app.get('/user-:id',async(req,res)=>{
  await db.sync();
  const user=await User.findOne({where:{id:req.params.id},attributes:['id','name','email'],include:["comments"]});
  res.json(user)
})
//Update a record
app.put('/user-:id',async(req,res)=>{
await db.sync();
await User.update({name:req.body.Name,email:req.body.Email},{where:{id:req.params.id}}).then(result=>{
  res.json(result+" Record Updated")
}).catch(err=>{
  res.json(err);
})
})

//Delete an record
app.delete('/user-:id',async(req,res)=>{
  await db.sync();
  await User.destroy({where:{id:req.params.id}}).then(result=>{
    res.json(result+" Record Deleted")
  }).catch(err=>{
    res.json(err);
  })
  })

  //Add Comment
  app.post('/comment',async(req,res)=>{
    console.log(req.body)
    await db.sync();
   
await Comment.create({
  
  text:req.body.text,
  UserId:req.body.user_id
}).then(data=>{
 return res.json({
    Message:'Successful'
    ,Record:data
  })})
  .catch(err=>{
   return res.send(err)
  })

 

   
  })
    //get all comments
  app.get('/comment',async(req,res)=>{
    await db.sync();
    const all_comments=await Comment.findAll({attributes:['id','text','USERId'],include:["user"]})
    return res.send(all_comments);
  })
app.listen(3000,()=>{
    console.log("Server is Active at Port 3000");
})
