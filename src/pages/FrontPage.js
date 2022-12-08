import { useEffect, useState } from "react"
import { getDownloadURL, ref } from "@firebase/storage"
import { auth, storage, provider } from "../firebase"
import { signInWithRedirect } from "@firebase/auth"
import "./FrontPage.css"

export const FrontPage = () => {

    const [videoUrl, setVideoUrl] = useState("")

    const videoInit = async () => {
        const videoRef = ref(storage, "media/welcome-banner.mp4")
        const url = await getDownloadURL(videoRef)
        setVideoUrl(url)
    }

    const signIn = async () => {
        signInWithRedirect(auth, provider).then(result => {
            console.log(result.user.displayName)
            console.log(result.user.email)
            console.log(result.user.photoURL)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        videoInit()
    }, [])

    return (
        <div className="front-page">
            <video src={videoUrl} id="front-page-video" alt="banner video" autoPlay muted loop>
                Your browser does not support the video tag.
            </video>
            <div className="video-text">
                <h1 className="front-page-welcome-text">Welcome to ELCA Student Government!</h1>
                <button className="btn open-login" onClick={signIn}>Sign In</button>
            </div>
        </div>  
    )
}

export default FrontPage;