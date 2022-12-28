// import { useState, useEffect } from "react"
// import { getDownloadURL, ref } from "@firebase/storage"
// import { storage } from "../../firebase"

// import useWindowDimensions from "../general/useWindowDimensions"
import Carousel from "../general/Carousel"
import "./WelcomeVideo.css"

export const WelcomeVideo = () => {

    // const [videoUrl, setVideoUrl] = useState("")
    // const { width } = useWindowDimensions()

    // const mediaInit = async () => {
    //     const videoRef = ref(storage, "media/welcome-banner.mp4")
    //     const videoUrl = await getDownloadURL(videoRef)
    //     setVideoUrl(videoUrl)
    // }


    // useEffect(() => {
    //     mediaInit()
    // }, [])

    return (
        <div className="gallery">
    
            <Carousel/>
            
            <img src="/media/logo-blue-white-border.png" alt="logo" className="welcome-logo"/>
        </div>
    )
}

export default WelcomeVideo