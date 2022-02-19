import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Form } from 'react-bootstrap';


const axios = require('axios');

// react-bootstrap 쓸 것

function Main() {

    const [isCreatedNumber, setIsCreatedNumber] = useState(false);
    const [key, setKey] = useState(0);
    const [answer, setAnswer] = useState<any>();
    const [tryedAnswers, setTryedAnswers] = useState<any[]>([]);
    const [strikeOut, setStrikeOut] = useState(false);

    const onSubmitAnswer = (e: any) => {
        // e.preventdefault();
        if (answer.length > 3) {
            alert('3자리 수를 입력해주세요!');
        } else {
            const params = { answer }
            console.log('key : ', key);
            axios
                .post(`http://localhost:3001/isitRightNumber?key=${key}`, params)
                .then((data: any) => {
                    if (data.data.result === '3S0B') {
                        setStrikeOut(true);
                    }
                    setTryedAnswers([...tryedAnswers, { count: data.data.result, answer: answer }]);
                })
                .catch((error: any) => {
                    console.log(error);
                })
        }
    }

    const onCreateRandumNumber = () => {
        if (!isCreatedNumber) {
            alert('생성되었습니다. 게임을 시작하세요!');
            let _key = Math.floor(Math.random() * 1000);
            setKey(_key);
            axios
                .get(`http://localhost:3001/createrandumnumber?key=${_key}`)
                .then((data: any) => {
                    console.log("data : ", data);
                })
                .catch((error: any) => {
                    console.log(error);
                })
        }else{
            setAnswer('');
            setTryedAnswers(new Array());
            setStrikeOut(false);
        }
        setIsCreatedNumber((prev) => !prev);
    }

    const onChange = (e: any) => {
        const { target: { value } } = e;
        setAnswer(value);
    }

    return (
        <>
            <div style={{ marginLeft: '3vw' }}>
                <h1>숫자야구게임</h1>
                <div><strong>
                    <div>숫자야구란 감춰진 3개의 숫자가 무엇인지 맞추는 게임입니다.</div>
                    <div>1) 3자리 숫자와 위치가 모두 맞아야 성공입니다.</div>
                    <div>2) 숫자는 0~9까지 구성되어 있으며, 각 숫자는 한번씩만 사용 가능합니다</div>
                    <div>3) 숫자와 자리의 위치가 맞으면 스트라이크(S), 숫자만 맞으면 볼(B) 입니다.</div>
                    <div>4) 숫자가 하나도 맞지 않을 경우 아웃(OUT) 으로 표시됩니다.</div>

                    <div>예시) 감춰진 숫자가 123 이라고 할 경우</div>
                    <div>- a. 102 = 1S 1B</div>
                    <div> - b. 124 = 2S</div>
                </strong></div>
                <Button
                    style={{ marginTop: '4vh' }}
                    onClick={onCreateRandumNumber}
                >{!isCreatedNumber ? '난수생성' : '초기화'}</Button>
                {isCreatedNumber ? <div><strong>***</strong></div> : <div style={{}}>난수를 생성해서 게임을 시작하세요!</div>}
            </div>
            <Container>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>정답은 ?</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter answer"
                            value={answer ? answer : ''}
                            onChange={onChange}
                        />
                        <Form.Text className="text-muted">

                        </Form.Text>
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={onSubmitAnswer}
                    >
                        Submit
                    </Button>
            </Container>
            <Record>
                {strikeOut ?
                    <h1>삼진아웃 !</h1> :
                    <div>{tryedAnswers.map((el, idx) => {
                        return <div key={idx}>
                            <p>{el.answer} =&gt; {el.count === '0S0B' ? '3OUT' : el.count}</p>
                        </div>
                    })}</div>
                }
            </Record>
        </>
    )
}

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