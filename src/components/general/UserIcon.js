import { signOut } from "@firebase/auth"
import { auth } from "../../firebase"
import { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import ProfilePhoto from "./ProfilePhoto"
import "./UserIcon.css"

export const UserIcon = () => {

    const user = useContext(UserContext)

    const signUserOut = async () => {
        await signOut(auth)
    }

    return (
        <div className="dropdown">
            <button className="dropbtn row">
                <p className="user-email">{user.email}</p>
                <ProfilePhoto/>
            </button>
            <div className="dropdown-content">
                <div onClick={signUserOut}>Sign Out</div>
            </div>
        </div>
    )
}