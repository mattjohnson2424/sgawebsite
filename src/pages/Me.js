import { useContext } from "react"
import ChangeProfilePicture from "../components/me/ChangeProfilePicture"
import UserContext from "../contexts/UserContext"

export const Me = () => {

    const user = useContext(UserContext)

    return (
        <>
            <div className="row">
                <div className="photo-info">
                    <img className="large-pfp" src={user.photoURL} alt="user-profile"/>
                    <ChangeProfilePicture/>
                </div>
                <h2>{user.email}</h2>
            </div>
        </>
    )
}

export default Me