const express = require('express');

const router = express.Router();


router.get('/ash',(req,res)=> {
    res.send("Hello from routes Folder!");
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

    res.json({
        confirmation:"success",
        data:body
    })
})

module.exports = router;