import Carousel from "../general/Carousel"
import "./WelcomeVideo.css"

export const WelcomeVideo = () => {

    return (
        <div className="gallery">
            <Carousel/>
            <img src="https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Flogo-blue-white-border.png?alt=media&token=73faf02f-7e7e-4fb7-96f1-3245920ed8d8" alt="logo" className="welcome-logo"/>
        </div>
    )
}

export default WelcomeVideo