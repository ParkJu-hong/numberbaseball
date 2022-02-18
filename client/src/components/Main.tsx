import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
const axios = require('axios');
// react-bootstrap 쓸 것

function Main() {

    const [isCreatedNumber, setIsCreatedNumber] = useState(false);
    const [key, setKey] = useState(0);
    const [answer, setAnswer] = useState();
    const [tryedAnswers, setTryedAnswers] = useState<any[]>([]);
    const [strikeOut, setStrikeOut] = useState(false);

    const [forCleanUp, setForCleanUp] = useState(false);

    useEffect(()=>{
        if(!forCleanUp){
            setKey(Math.floor(Math.random() * 1000));
        }
        console.log('tryedAnswers : ', tryedAnswers);
        return ()=>{
            setForCleanUp(true);
        }
    }, [tryedAnswers])


    return (
        <>  
            <div style={{ marginLeft: '3vw'}}>
            <h1>숫자야구게임</h1>
            <div><strong>
               <div>숫자야구란 감춰진&lt;&gt; 3개의 숫자가 무엇인지 맞추는 게임입니다.</div>
               <div>1) 3자리 숫자와 위치가 모두 맞아야 성공입니다.</div>
               <div>2) 숫자는 0~9까지 구성되어 있으며, 각 숫자는 한번씩만 사용 가능합니다</div>
               <div>3) 숫자와 자리의 위치가 맞으면 스트라이크(S), 숫자만 맞으면 볼(B) 입니다.</div>
               <div>4) 숫자가 하나도 맞지 않을 경우 아웃(OUT) 으로 표시됩니다.</div>

               <div>예시) 감춰진 숫자가 123 이라고 할 경우</div>
               <div>- a. 102 = 1S 1B</div>
               <div> - b. 124 = 2S</div>
            </strong></div>
            <Button 
                style={{ marginTop: '4vh'}}
                onClick={()=>{
                    if(!isCreatedNumber){
                        alert('생성되었습니다. 게임을 시작하세요!');
                    
                        axios
                        .get(`http://localhost:3001/createrandumnumber?key=${key}`)
                        .then((data : any) => {
                            console.log("data : ", data);
                        })
                        .catch((error : any)=>{
                            console.log(error);
                        })
                    }
                    setIsCreatedNumber((prev)=>!prev);
                }}
            >{!isCreatedNumber ? '난수생성' : '초기화'}</Button>
            {isCreatedNumber ? <div><strong>***</strong></div> : <div style={{}}>난수를 생성해서 게임을 시작하세요!</div>}
            </div>
            <Container>
                <div><strong>정답은 ?</strong></div>
                <br></br>
                <InputGuessNumber 
                value={answer ? answer : ''}
                onChange={(e :any)=>{
                    const { target: { value }} = e;
                    setAnswer(value);
                }}/>
                <Button onClick={()=>{
                        /* 
                            버튼을 누르면 서버로 키랑 정답 보내져서 키는 new Random(MersenneTwister19937.seed(key));로 정답을 확인함
                            정답은 서버에서 확인하고 맞으면 맞다고 틀리면 { number: 123, strike: 1, ball: 2, out: 0 } 다음과 같은 객체를
                            JSON으로 보내줌 그럼 그 보낸 객체를 배열에 담아서 뿌려줘야함 (AJAX으로)
                        */
                        const params = { answer }
                        axios
                        .post(`http://localhost:3001/isitRightNumber?key=${key}`, params)
                        .then((data : any) => {
                            console.log("data.data.result : ", data.data.result);
                            if(data.data.result === '3S0B'){
                                setStrikeOut(true);
                            }
                            setTryedAnswers([...tryedAnswers, { count: data.data.result, answer: answer}]);
                        })
                        .catch((error : any)=>{
                            console.log(error);
                        })
                }}>제출</Button>
            </Container>
            <Record>
                {/* 추측한 숫자를 객체를 가진 배열로 state에 저장하고, map으로 뿌릴 것 */}
                {/* ex) [{ number: 123, strike: 1, ball: 2, out: 0 }] */}
                {/* {strikeOut ? 
                <h1>삼진아웃 !</h1> : 
                <div>ex) 1 2 3 =&gt; 1s 2b 0out</div>
                } */}
                <div>{tryedAnswers.map((el, idx) => {
                    return <div key={idx}>
                        {el.answer} =&gt; {el.count === '0S0B' && '3OUT'}
                    </div>
                })}</div>
            </Record>
        </>
    )
}
const Button = styled.button`
    border: 1px solid black;
    background-color: rgba(0,0,0,0);
    color: black;
    padding: 5px;
    margin-top: 2vh;
`

const Record = styled.div`
    display: flex;
    width: 100vw;
    justify-content: space-around;
`

const Container = styled.div`
    width: 100vw;
    height: 30vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const InputGuessNumber = styled.input`
    font-size: 30px;
`

export default Main;