import { useContext } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/general/Navbar"
import ChangeProfilePicture from "../components/me/ChangeProfilePicture"
import UserContext from "../contexts/UserContext"

export const Me = () => {

    const user = useContext(UserContext)

    return (
        <>
            <Navbar/>
            <ChangeProfilePicture/>
            <img className="large-pfp" src={user.photoURL} alt="user-profile"/>
            <h2>{user.email}</h2>
            <Link to="/">Back to Home</Link>
        </>
    )
}

export default Me