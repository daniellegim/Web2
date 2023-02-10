import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import auth from "../utilities/Firebase";
import React, { useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignUp() {
        try {
            console.log(email, password)
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/store");
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div>
            <Form className={"w-50"}>
                <h1>
                    הרשמה
                </h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>כתובת מייל</Form.Label>
                    <Form.Control
                        onChange={(e) => setEmail(e.target.value)}
                        name="email" type="email" placeholder="הזן מייל"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>סיסמא</Form.Label>
                    <Form.Control
                        onChange={(e) => setPassword(e.target.value)}
                        name="password" type="password" placeholder="הזן סיסמא"/>
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={handleSignUp}>
                הרשמה
            </Button>
        </div>
    );
}

export default SignUp;
