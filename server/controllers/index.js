const models = require('../models');
var CryptoJS = require("crypto-js");

module.exports = {
    testGet: (req, res) => {
        models.testfunction((err, result) => {
            if (err) {
                console.log(err);
                res.status(200).send(err);
            } else {
                console.log(result);
                res.status(200).json({ result });
            };
        })
    },
    insertDBdecryptionKey: (req, res) =>{
        // 사용자가 난수를 생성했을때 사용하는 함수
        let randumnumber = Math.floor(Math.random() * 1000);
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify({randumnumber}), secretKey).toString();

        /* 
            encrypted를 클라이언트에 보내고, bytes를 db에 저장해놓고, 
            만약 클라이언트가 정답제출시 정답과 함께 암호화키를 서버에 응답
            서버에서 암호화키로 복호화해서 정답을 본다음에 클라이언트가 보낸 정답과 같으면
            3strike니까 삼진아웃으로 서버에서 클라이언트에게 응답을 보냄
            아닐시 카운트를 보냄 ex) res.json({ number: 123, strike: 1, ball: 2, out: 0 });
        */
       /*
            db에 어떻게 저장?
       */
        // 복호화
        const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
        const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        models.insertDecryptionKey((error, result)=>{

        }, bytes);
        res.status(200).json({ randumnumber : decrypted.randumnumber});
    },
    isItRight: (req, res) => {
        // 사용자가 정답 제출했을때 사용하는 함수
        
    },
    compare: (secret, guess) => {
        var bulls = 0;
        var cows = 0;
        var numbers = new Array(10);
        for (var i=0; i<10; i++){
          numbers[i] = 0;
        }
        for (var i = 0; i<secret.length; i++) {
          var s = secret.charCodeAt(i) - 48;
          var g = guess.charCodeAt(i) - 48;
          if (s == g) bulls++;
          else {
            if (numbers[s] < 0) cows++;
            if (numbers[g] > 0) cows++;
            numbers[s] ++;
            numbers[g] --;
          }
        }
        return bulls + "S" + cows + "B";
      }
}

