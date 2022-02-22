const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));

app.get('/createrandumnumber', controllers.createRandumNumber);
app.get('/deleterandumNumber', controllers.deleteRandumNumber);
app.post('/isitRightNumber', controllers.isitRightNumber);

app.listen(3001, ()=>{
    console.log("3001port 서버 실행");
})
