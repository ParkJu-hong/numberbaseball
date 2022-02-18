const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

// const { appendFile } = require('fs');
const app = express();
const cors = require('cors');

const { Random, MersenneTwister19937 } = require('random-js');

app.use(cors());
app.use(bodyParser.json());//json타입
app.use(bodyParser.urlencoded({extended:true}));//post방식의 encoding

app.get('/createrandumnumber',(req,res)=>{
    const key = req.query.key;

    const random = new Random(MersenneTwister19937.seed(key));

    // 배열로 만들어 볼 것
    // 이렇게 계속 random을 계속 돌려서 만들면 .seed에 key를 넣을때 다시는 안나옴
    const v1 = random.integer(1, 9);
    let v2 = random.integer(1, 9);
    while (v1 === v2) {
        v2 = random.integer(1, 9);
    }
    let v3 = random.integer(1, 9);
    while (v1 === v3 || v2 === v3) {
        v3 = random.integer(1, 9);
    }

    let result = v1 * 100 + v2 * 10 + v3;
    let _result = random.integer(100, 999);

    console.log("randumNumber : ", result);

    // 클라이언트가 키만 가지고있고, 

    res.json({ result: 'Ok start' });
});

// app.get('/createrandumnumber', (req, res)=>{
//     let randumnumber = Math.floor(Math.random() * 1000);
//     let secretKey  = 'secret key'

//     // 암호화
//     res.status(200).json({randumnumber: randumnumber.toString().split('')});
// });

app.post('/isitRightNumber', (req, res) => {
    const key = req.query.key;
    const guess = req.body.answer; // 사용자가 추측한 정답

    const random = new Random(MersenneTwister19937.seed(key));

    const v1 = random.integer(1, 9);
    let v2 = random.integer(1, 9);
    while (v1 === v2) {
        v2 = random.integer(1, 9);
    }
    let v3 = random.integer(1, 9);
    while (v1 === v3 || v2 === v3) {
        v3 = random.integer(1, 9);
    }

    const secret = v1 * 100 + v2 * 10 + v3; // 맨처음 키를 넣어서 추출한 진짜 정답
    const secretString = secret.toString();
    const guessString = guess.toString();

    let count = controllers.compare(secretString, guessString);

    console.log("count : ", count);

    console.log('사용자가 추측한 정답 : ', guess);
    console.log('randum을 나눠서 만든 숫자 : ', secret);

    res.json({ result: count});
});


app.listen(3001, ()=>{
    console.log("3001port 서버 실행");
    console.log(process.env.DATABASE_PASSWORD);
})

/*
    22.02.17 문제
    암호화를 하고 복호화를 휘발성없게 해야하는데 미들웨어 안에 암호화된 키와 복호화할 수 있는 키를 넣어버리면
    다음 서버 미들웨어들이 돌때 휘발되어 버리니깐 아마 DB에다 저장해야되지 않나 싶다.  
    암호화, 복호화키(대칭키와 비대칭키)를 어떻게 DB에 저장하면 좋을까?
*/

/*
    암호화와 복호화 라이브러리인 crypto-js, npm install crypto-js 사용해서 난수 암호화한 값
    클라이언트한테 보내고
    
    클라이언트가 제출한 값을 crypto-js로 복호화해서 맞으면 맞다고 응답을 보낼 것 
*/