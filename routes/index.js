const express = require('express');
const sql = require('mssql');

const router = express.Router();
const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({
  extended: true
}));


router.get("/pdf/:PDFName",async (req,res)=> {
    try{
         const pdfName = req.params.PDFName;
         //regex format 
         const petInformation = await sql.query("SELECT PatFirstName, PatDOB, PatSex From DBO.PathologyOrdering where RequestCode = '"+pdfName+"'");
         let petInfo = petInformation.recordsets[0][0];
        
         let age = new Date();
         const days = Math.floor((age -petInfo.PatDOB)/1000/3600/24%365%30);
         const months =  Math.floor((age -petInfo.PatDOB)/1000/3600/24%365/30);
         const years = Math.floor((age -petInfo.PatDOB)/1000/3600/24/365);
         
    
         let animalName = petInfo.PatFirstName;
        
         let sex = petInfo.PatSex =='M' ? "Male": "Female";
         console.log(years +' y',months+ " m",days + " d", animalName,sex);

        const ownerInformation = await sql.query("SELECT Owner, Species, Breed, Desexed FROM DBO.Patients,DBO.PathologyOrdering where Patient# = P2kPatientID and  RequestCode = '"+pdfName+"'");
        const ownerInfo = ownerInformation.recordsets[0][0];
        const Owner = ownerInfo.Owner;
        const Species = ownerInfo.Species;
        const Breed = ownerInfo.Breed;
        const Desexed = ownerInfo.Desexed;

        console.log(Owner,Species,Breed,Desexed)

        const ClinicInformation = await sql.query("SELECT Surname,[First Name] as FirstName,[Address Line 1] as Address1, [Address Line 2] as Address2, Suburb, State, Postcode,ExternalClinicCode From DBO.Addresses as A, DBO.pathologyOrdering as P where A.ID = P.P2kAddressId and P.RequestCode = '"+pdfName+"' ");
        const ClinicInfo = ClinicInformation.recordsets[0][0];
        const ClinicDetails = ClinicInfo.Address1 ;
        const Address = ClinicInfo.Address2 + ' ' + ClinicInfo.Suburb +' ,' + ClinicInfo.State +' ' + ClinicInfo.Postcode;
        const surname = ClinicInfo.Surname;
        const FirstName = ClinicInfo.FirstName;
        // let AVA = ClinicInfo.ExternalClinicCode;
        // const AVANum = AVA.slice(6);
        console.log(ClinicDetails);
        console.log(Address);
    } catch(err) {
        console.log(err)
    }
})


router.get("/pdf/:PDFName",async (req,res)=> {
    const pdfName = req.params.PDFName;

});

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
        // sql.query("insert into dbo.sampleindicator values(2,3,4,'"+body.ClinicalHisotry+"','"+body.description+"','"+body.cytologyFindings+"','"+body.differentialDiag+"', '"+pdfName+"')");

        res.json({
            confirmation:"success",
            data: body
        })
    
    });


router.put('/pdf/:id', (request, response) => {
    const id = request.params.id;
 
    sql.query('UPDATE dbo.sampleindicator SET ? WHERE id = ?', [request.body, id], (error, result) => {
        if (error) throw error;
        response.send('User updated successfully.');
    });
});




module.exports = router;