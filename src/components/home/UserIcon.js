import { Link } from "react-router-dom"
import { signOut } from "@firebase/auth"
import { auth } from "../../firebase"

export const UserIcon = () => {

    const signUserOut = async () => {
        await signOut(auth)
    }

    return (
        <div className="dropdown">
            <button className="dropbtn">Me</button>
            <div className="dropdown-content">
                <Link to="/me">My Profile</Link>
                <div onClick={signUserOut}>Sign Out</div>
            </div>
        </div>
    )
}