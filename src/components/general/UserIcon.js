import { signOut } from "@firebase/auth"
import { auth } from "../../firebase"
import { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import ProfilePhoto from "./ProfilePhoto"
import { Link } from "react-router-dom"
import "./UserIcon.css"

export const UserIcon = () => {

    const user = useContext(UserContext)

    const signUserOut = async () => {
        await signOut(auth)
        window.location.href = "/"
    }

    return (
        <div className="dropdown">
            <div className="dropbtn">
                <p className="user-email">{user.email}</p>
                <ProfilePhoto/>
            </div>
            <div className="dropdown-content">
                <Link className="dropdown-item" to="/about-us">About Us</Link>
                <Link className="dropdown-item" to="/help">Help</Link>
                <Link className="dropdown-item" to="/settings">Settings</Link>
                {user.admin && <Link className="dropdown-item" to="/admins">Admins</Link>}
                {user.owner && <Link className="dropdown-item" to="/transfer-ownership">Transfer Ownership</Link>}
                <div className="dropdown-item" onClick={signUserOut}>Sign Out</div>
            </div>
        </div>
    )
}