import { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import "./ProfilePhoto.css"

export const ProfilePhoto = () => {

    const user = useContext(UserContext)

    return (
        <>
            {user.photoURL ? 
                <img className="profile-photo" src={user.photoURL} alt={""} />
            :
                <div className="profile-photo">{user.firstName[0]}</div>
            }
        </>
        
    )
}

export default ProfilePhoto