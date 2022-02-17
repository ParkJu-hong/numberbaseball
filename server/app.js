const express = require('express');
// const { appendFile } = require('fs');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/createrandumnumber', (req, res)=>{
    let randumnumber = Math.floor(Math.random() * 1000);
    res.status(200).json({randumnumber});
})

app.listen(80, ()=>{
    console.log("80port 서버 실행")
})