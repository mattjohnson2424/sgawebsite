import { useState } from "react"
import { sendPasswordResetEmail } from "@firebase/auth"
import { auth } from "../../firebase"

export const ForgotPassword = () => {

    const [email, setEmail] = useState("")

    const passwordReset = async e => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email).then(() => {
            console.log("Email sent")
        })
        window.location("/")
    } 

    return (
        <form>
            <input placeholder="email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <button onClick={passwordReset}>Send Password Reset Email</button>
        </form>
    )

}

export default ForgotPassword