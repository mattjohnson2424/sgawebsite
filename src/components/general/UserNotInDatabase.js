import { signOut } from "@firebase/auth"
import { auth } from "../../firebase"
import "./UserNotInDatabase.css"

export const UserNotInDatabase = () => {

    const signUserOut = async () => {
        await signOut(auth)
        window.location.reload()
    }

    return (
        <>
            <div className="blue-block"></div>
            <div className="white-block"></div>
            <div className="not-in-db-container">
                <div className="not-in-db">
                    <h1>Oh no!</h1>
                    <p>It looks like your Google account has not been added to ELCA SGA, if you believe this is in error, please contact an SGA representative.</p>
                    <button className="btn back-to-home" onClick={signUserOut}>Back to Home</button>
                </div>
            </div>
            
        </>
    )
}

export default UserNotInDatabase