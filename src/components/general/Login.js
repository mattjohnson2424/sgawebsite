import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from "@firebase/auth";
import Modal from "../general/Modal";
import "./Login.css"

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
            <button className="btn open-login" onClick={e => setShow(true)}>Login</button>
            <Modal show={show} onClose={onClose}>
                <form className="login-form">
                    <h2>Log In</h2>
                    <div className="input-group login-input-group">      
                        <input id="login-email-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="login-email-input">Email</label>
                    </div>
                    <div className="input-group login-input-group">      
                        <input id="login-password-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="login-email-password">Password</label>
                    </div>
                    <p>{err}</p>
                    <div className="submit-forgot">
                        <input className="btn submit-login" type="submit" onClick={login}/>
                        <div>
                        <Link to="/reset-password">Forgot Password?</Link>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default Login;