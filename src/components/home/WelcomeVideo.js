import { useState, useEffect } from "react"
import { getDownloadURL, ref } from "@firebase/storage"
import { storage } from "../../firebase"
import "./WelcomeVideo.css"

export const WelcomeVideo = () => {


    const [videoUrl, setVideoUrl] = useState("")

    const mediaInit = async () => {
        const videoRef = ref(storage, "media/welcome-banner.mp4")
        const videoUrl = await getDownloadURL(videoRef)
        setVideoUrl(videoUrl)
    }


    useEffect(() => {
        mediaInit()
    }, [])

    return (
        <div className="gallery">
            <video src={videoUrl} id="gallery-video" type="video/mp4" alt="banner video" autoPlay muted loop>
                Your browser does not support the video tag.
                
            </video>
            <img src="/media/logo-blue-white-border.png" alt="logo" className="welcome-logo"/>
        </div>
    )
}

export default WelcomeVideo