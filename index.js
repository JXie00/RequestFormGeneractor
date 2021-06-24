const express = require('express');
const sql = require('mssql');

const app = express();

// let config = {
//     user: 'sa',
//     password: '0vODz]84',
//      server: "ivp-srv",
//     database: 'Practice',
//     options: {
//       cryptoCredentialsDetails: {
//       minVersion: 'TLSv1'
//       },
//       trustServerCertificate: true
//       }

//   };

//   (async () => {
//     try{
//       await sql.connect(config);
//       // const result = await sql.query `select surname from dbo.Addresses where ID = 1059`;
//       // console.log(result);
//       console.log("connecting succefully")
//     }catch(err){
//       console.log(err);
//     }
//   })();


app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '2mb' }));

const indexRouter = require('./routes/index');

app.use("/",indexRouter);

module.exports = app;


// app.get("/api/:id",(req,res) => {
  
//   res.send(req.params.id)
  // if(req.body.message){
  //   console.log("message received");
  //   console.log(req.body);
  // } else {
  //   res.send("Hey I didnt get anything");
  // }
  // const data = req.body;
  // console.log(data);

  // res.json({
  //   error:"message"
  // });
// })

// app.post("/aop", async (req,res)=> {
//     console.log(req.body)
  
//     res.send("yoo check it out");
// })





