import { useEffect, useState } from "react"
import Login from "../components/general/Login"
import { getDownloadURL, ref } from "@firebase/storage"
import { storage } from "../firebase"
import "./FrontPage.css"

export const FrontPage = () => {

    const [videoUrl, setVideoUrl] = useState("")

    const videoInit = async () => {
        const videoRef = ref(storage, "media/welcome-banner.mp4")
        const url = await getDownloadURL(videoRef)
        setVideoUrl(url)
    }

    useEffect(() => {
        videoInit()
    }, [])

    return (
            <div className="front-page">
                <video src={videoUrl} id="front-page-video" alt="banner video" autoPlay muted loop>
                    {/* <source src="/media/welcome-banner.mp4" type="video/mp4"/> */}
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