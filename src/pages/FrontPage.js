import Login from "../components/general/Login"
import "./FrontPage.css"

export const FrontPage = () => {
    return (
            <div className="front-page">
                <video id="front-page-video" autoPlay muted loop>
                    <source src="/media/welcome-banner.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                <div className="video-text">
                    <h1 className="front-page-welcome-text">Welcome to ELCA Student Government!</h1>
                    <Login/>
                </div>
            </div>
    )
}

export default FrontPage;