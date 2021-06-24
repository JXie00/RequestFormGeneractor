const express = require('express');
const sql = require('mssql');
const axios = require("axios");
const { request } = require('express');

const app = express();

let config = {
    user: 'sa',
    password: '0vODz]84',
     server: "ivp-srv",
    database: 'Practice',
    options: {
      cryptoCredentialsDetails: {
      minVersion: 'TLSv1'
      },
      trustServerCertificate: true
      }

  };

  (async () => {
    try{
      await sql.connect(config);
      // const result = await sql.query `select surname from dbo.Addresses where ID = 1059`;
      // console.log(result);
      console.log("connecting succefully")
    }catch(err){
      console.log(err);
    }
  })();


app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '2mb' }));

// app.post("/api", (req,res)=> {
//         if (req.body.message) {
//           console.log("message received")
//           console.log(req.body.message)
//         } else {
//           res.send("didn't get anything")
//         }
//       })
// const object = {
//   message:"message use aixos",
//   id: 1
// }
// axios.post("http://localhost:3000/api",object).then((res)=> 
//         console.log(res))
// axios
//     .get('/PDF/:PDFID', {
//       timeout: 5000
//     })
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

// axios.get('http://localhost:3000/pdf/:id').then(res=>{
//   res.send("your id is",request.params.id);
// })
// .catch(err => {
//   console.log(err)
// });
// 'AU501DR1435'
app.get('/:id', async (req,res) => {
  let data = req.params.id;
  // let result = await sql.query("SELECT * FROM DBO.PathologyOrdering WHERE PatFirstName = 'Thor'");
  let result = await sql.query("SELECT * FROM DBO.PathologyOrdering WHERE RequestCode = '"+data+"' ");

  res.send(result.recordsets[0][0]);
  // console.log(result);
});

app.post("/api", async(req,res) => {
              console.log(req.body);
              const retrivedData = req.body;
              
              res.send(retrivedData)

}
)




