import { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import "./WelcomeVideo.css"

export const WelcomeVideo = () => {

    const user = useContext(UserContext)

    return (
        <div className="gallery">
            <video id="gallery-video" autoPlay muted loop>
                <source src="/media/welcome-banner.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <p className="welcome-text">Welcome, {user.firstName ? user.firstName : user.email}</p>
        </div>
    )
}

export default WelcomeVideo