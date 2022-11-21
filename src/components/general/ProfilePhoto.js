import { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import "./ProfilePhoto.css"

export const ProfilePhoto = () => {

    const user = useContext(UserContext)

    return (
        <div className="profile-photo" style={{ backgroundColor: user.profileBackgroundColor }}>
            {user.firstName[0] + user.lastName[0]}
        </div>
    )
}

export default ProfilePhoto