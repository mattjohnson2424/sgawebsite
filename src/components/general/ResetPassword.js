import { sendPasswordResetEmail } from "@firebase/auth"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/UserContext"
import { auth } from "../../firebase"
import "./ResetPassword.css"


export const ResetPassword = () => {

    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const [err, setErr] = useState("")
    const user = useContext(UserContext)

    const passwordReset = async () => {
        try {
            await sendPasswordResetEmail(auth, email)
            setEmailSent(true)
        } catch (error) {
            setErr(error.message)
        }
    }



    return (
        <>  
            <div className="blue-block"></div>
            <div className="gray-block"></div>
            
            <div className="reset-password-container">
                <div className="reset-password">
                    <h1 style={{ textAlign: "center"}}>Reset Password</h1>
                    {!emailSent ? <>
                        <div className="input-group" id="reset-password-input-group">
                            <input required id="password-reset-email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                            <span className="bar"></span>
                            <label htmlFor="password-reset-email">Enter Email</label>
                        </div>
                        <p style={{ color: "red", textAlign: "center" }}>{err === "Firebase: Error (auth/user-not-found)." && "That email does not exist"}</p>
                        <button className="btn password-reset-btn" onClick={passwordReset}>Send Password Reset Email</button>
                    </> :
                    <>
                        <p className="confirm-text">A password reset email has been sent to {email}. It may be in your spam folder</p>
                        <Link to="/"><button className="btn back-to-login">Back to {user ? "Home" : "Login"}</button></Link>
                    </>}
                    
                </div>
            </div>
        </>
    )

}

export default ResetPassword