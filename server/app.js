const express = require('express');
import CryptoJS from "crypto-js";

// const { appendFile } = require('fs');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(()=>{

})

app.get('/createrandumnumber', (req, res)=>{
    let randumnumber = Math.floor(Math.random() * 1000);
    let privateKey = 'secret key'
    
    // 암호화
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify({randumnumber}), secretKey).toString();
    // 복호화
    const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);

    res.status(200).json({encrypted});
});

app.get('/isitRightNumber', (req, res) => {

})

app.listen(80, ()=>{
    console.log("80port 서버 실행")
})

/*
    22.02.17 문제
    암호화를 하고 복호화를 휘발성없게 해야하는데 미들웨어 안에 암호화된 키와 복호화할 수 있는 키를 넣어버리면
    다음 서버 미들웨어들이 돌때 휘발되어 버리니깐 아마 DB에다 저장해야되지 않나 싶다.  
*/

/*
    암호화와 복호화 라이브러리인 crypto-js, npm install crypto-js 사용해서 난수 암호화한 값
    클라이언트한테 보내고
    
    클라이언트가 제출한 값을 crypto-js로 복호화해서 맞으면 맞다고 응답을 보낼 것 
*/