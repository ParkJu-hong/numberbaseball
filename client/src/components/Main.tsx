import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Form, Toast, ListGroup } from 'react-bootstrap';
const axios = require('axios');

function Main() {

    const [isCreatedNumber, setIsCreatedNumber] = useState(false);
    const [key, setKey] = useState(0);
    const [answer, setAnswer] = useState<any>();
    const [tryedAnswers, setTryedAnswers] = useState<any[]>([]);
    const [strikeOut, setStrikeOut] = useState(false);
    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);
    const [showC, setShowC] = useState(true);

    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);
    const toggleShowC = () => setShowC(!showC);

    const resetRandumNumber = () => {
        axios
            .get(`http://localhost:3001/deleterandumNumber`)
            .then((data: any) => {
                console.log("data : ", data);
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    const compare = () => {
        let arrTemp = new Array();
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 5; j++) {
                if (i !== j && !arrTemp.includes(`${i}${j}`) && !arrTemp.includes(`${j}${i}`)) {
                    arrTemp.push(`${i}${j}`);
                    console.log(`${i}${j}`);
                };
            };
        };

        let i = 0;
        while (1) {
            if (arrTemp.length === i) {
                break;
            } else if (answer[arrTemp[i][0]] === answer[arrTemp[i][1]]) {
                return true;
            };
            i++;
        };

        if (answer.includes('0')) return true;

        return false;
    }


    const onSubmitAnswer = (e: any) => {
        if (answer !== undefined) {
            if (answer.length > 5) {
                alert('5자리 수를 입력해주세요!');

            } else if (!isCreatedNumber) {
                toggleShowC();

            } else if (compare()) {
                toggleShowB();
            } else {
                const params = { answer };

                axios
                    .post(`http://localhost:3001/isitRightNumber?key=${key}`, params)
                    .then((data: any) => {
                        if (data.data.result === '5S0B') {
                            setStrikeOut(true);
                        }
                        setTryedAnswers([...tryedAnswers, { count: data.data.result, answer: answer }]);
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            };
        };
    };

    const onCreateRandumNumber = () => {
        if (!isCreatedNumber) {
            toggleShowA();
            let _key = Math.floor(Math.random() * 1000);
            setKey(_key);
            axios
                .get(`http://localhost:3001/createrandumnumber?key=${_key}`)
                .then((data: any) => {
                    console.log("data : ", data);
                })
                .catch((error: any) => {
                    console.log(error);
                });
        } else {
            resetRandumNumber();
            setAnswer('');
            setTryedAnswers(new Array());
            setStrikeOut(false);
        };
        setIsCreatedNumber((prev) => !prev);
    };

    const onChange = (e: any) => {
        let { target: { value } } = e;
        setAnswer(value);
    };

    return (
        <>
            <Toast
                show={!showA}
                onClose={toggleShowA}
                style={{
                    position: 'fixed',
                    top: '2vh',
                    left: '5vw'
                }}
            >
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">숫자야구게임</strong>
                </Toast.Header>
                <Toast.Body>생성되었습니다. 게임을 시작하세요!</Toast.Body>
            </Toast>
            <Toast
                show={!showB}
                onClose={toggleShowB}
                style={{
                    position: 'fixed',
                    top: '2vh',
                    left: '5vw'
                }}
            >
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">숫자야구게임</strong>
                </Toast.Header>
                <Toast.Body>0 또는 같은 숫자를 반복해서 쓰지 마세요!</Toast.Body>
            </Toast>
            <Toast
                show={!showC}
                onClose={toggleShowC}
                style={{
                    position: 'fixed',
                    top: '2vh',
                    left: '5vw'
                }}
            >
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">숫자야구게임</strong>
                </Toast.Header>
                <Toast.Body>숫자를 생성하세요!</Toast.Body>
            </Toast>

            <div style={{ marginLeft: '3vw' }}>
                <h1>숫자야구게임</h1>
                <div><strong>
                    <div>숫자야구란 감춰진 5개의 숫자가 무엇인지 맞추는 게임입니다.</div>
                    <div>1) 3자리 숫자와 위치가 모두 맞아야 성공입니다.</div>
                    <div>2) 숫자는 1~9까지 구성되어 있으며, 각 숫자는 한번씩만 사용 가능합니다</div>
                    <div>3) 숫자와 자리의 위치가 맞으면 스트라이크(S), 숫자만 맞으면 볼(B) 입니다.</div>
                    <div>4) 숫자가 하나도 맞지 않을 경우 아웃(OUT) 으로 표시됩니다.</div>

                    <div>예시) 감춰진 숫자가 12345 이라고 할 경우</div>
                    <div> A - 15432 = 1S 4B</div>
                </strong></div>
                <Button
                    style={{ marginTop: '4vh' }}
                    onClick={onCreateRandumNumber}
                >{!isCreatedNumber ? '숫자생성' : '초기화'}</Button>
                {isCreatedNumber ? <div><strong>***</strong></div> : <div>난수를 생성해서 게임을 시작하세요!</div>}
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
                {strikeOut && <h1>정답!</h1>}
                <ListGroup>{tryedAnswers.map((el, idx) => {
                    return <ListGroup.Item key={idx}>
                        <strong>{el.answer} =&gt; {el.count}</strong>
                    </ListGroup.Item>
                })}</ListGroup>
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

export default Main;