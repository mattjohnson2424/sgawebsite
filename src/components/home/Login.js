import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from "@firebase/auth";
import Modal from "../general/Modal";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("")
    const [show, setShow] = useState(false)

    const login = async e => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setEmail("")
            setPassword("")
        } catch (err) {
            setErr(err.message)
        }
        
    }

    const onClose = () => {
        setShow(false)
        setEmail("")
        setPassword("")
    }

    return (
        <>
            <button onClick={e => setShow(true)}>Login</button>
            <Modal show={show} onClose={onClose}>
                <form id="login">
                    <h2>Log In</h2>
                    <label htmlFor="login-email">Email: </label>
                    <input id="login-email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                    <br/>
                    <label htmlFor="login-password">Password: </label>
                    <input id="login-password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <br/>
                    <p>{err}</p>
                    <input type="submit" onClick={login}/>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </form>
            </Modal>
        </>
    )
}

export default Login;