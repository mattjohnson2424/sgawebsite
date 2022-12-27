import { useState, useEffect } from "react"
import { getDownloadURL, ref } from "@firebase/storage"
import { storage } from "../../firebase"
import "./WelcomeVideo.css"
import useWindowDimensions from "../general/useWindowDimensions"

export const WelcomeVideo = () => {

    const [videoUrl, setVideoUrl] = useState("")
    const { width } = useWindowDimensions()

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
            {width > 768 ? 
                <video src={videoUrl} id="gallery-video" type="video/mp4" alt="banner video" autoPlay muted loop>
                    Your browser does not support the video tag.
                </video>
            :
                <img 
                    id="gallery-photo"
                    src="https://static.wixstatic.com/media/98a7e8_b2d44be3177a4d598b540ec68acd7d09~mv2.jpg/v1/fill/w_1436,h_886,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ELCA%202021-0503.jpg"
                    alt="elca"
                />
            }
            
            <img src="/media/logo-blue-white-border.png" alt="logo" className="welcome-logo"/>
        </div>
    )
}

export default WelcomeVideo