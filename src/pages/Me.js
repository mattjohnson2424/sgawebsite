import { useContext } from "react"
import ChangeProfilePicture from "../components/me/ChangeProfilePicture"
import UserContext from "../contexts/UserContext"

export const Me = () => {

    const user = useContext(UserContext)

    return (
        <>
            <ChangeProfilePicture/>
            <img className="large-pfp" src={user.photoURL} alt="user-profile"/>
            <h2>{user.email}</h2>
        </>
    )
}

export default Me