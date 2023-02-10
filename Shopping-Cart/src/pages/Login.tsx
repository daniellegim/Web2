import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import auth from "../utilities/Firebase";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    async function handleFormSubmit() {
        try {
            console.log(email, password)
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/store");
        } catch (e) {
            alert(e)
        }
    }


    return (
        <div>
            <Form className={"w-50"} onSubmit={() => handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>כתובת מייל</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="הזן מייל"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>סיסמא</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password"
                                  placeholder="הזן סיסמא"/>
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={handleFormSubmit}>
                כניסה
            </Button>
            <Link className="m-5" to="/signUp">הרשמה</Link>
        </div>
    );
}
