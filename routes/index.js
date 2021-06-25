const express = require('express');
const sql = require('mssql');
const router = express.Router();
const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({
  extended: true
}));



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


router.get("/pdf/:PDFName",async (req,res)=> {
         const pdfName = req.params.PDFName;
         //regex format 
         const petInformation = await sql.query("SELECT PatFirstName, PatDOB, PatSex From DBO.PathologyOrdering where RequestCode = '"+pdfName+"'")
         let petInfo = petInformation.recordsets[0][0];
        
         let age = new Date();
         age -= petInfo.PatDOB;
    
         let animalName = petInfo.PatFirstName;
        
         let sex = petInfo.PatSex =='M' ? "Male": "Female";
         console.log(age,animalName,sex);

})



router.get('/query', (req,res)=> {
    const name = req.query.name;
    const occupation = req.query.occupation;
    
    const data = {
        name:name,
        occupation:occupation
    }
    
    res.json(data);
});


router.post('/connect',(req,res)=> {

        const body = req.body;
        console.log(body);
        console.log(pdfName);
        sql.query("insert into dbo.sampleindicator values(2,3,4,'"+body.ClinicalHisotry+"','"+body.description+"','"+body.cytologyFindings+"','"+body.differentialDiag+"', '"+pdfName+"')");

        res.json({
            confirmation:"success",
            data: body
        })
    
    });


router.put('/pdf/:id', (request, response) => {
    const id = request.params.id;
 
    pool.query('UPDATE dbo.sampleindicator SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;
 
        response.send('User updated successfully.');
    });
});


   


module.exports = router;