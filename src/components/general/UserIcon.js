import { Link } from "react-router-dom"
import { signOut } from "@firebase/auth"
import { auth } from "../../firebase"
import { useContext } from "react"
import UserContext from "../../contexts/UserContext"

export const UserIcon = () => {

    const user = useContext(UserContext)

    const signUserOut = async () => {
        await signOut(auth)
    }

    return (
        <div className="dropdown">
            <button className="dropbtn"><img className="navbar-profile" src={user.photoURL} alt="user profile"/></button>
            <div className="dropdown-content">
                <Link to="/me">My Profile</Link>
                <div onClick={signUserOut}>Sign Out</div>
            </div>
        </div>
    )
}