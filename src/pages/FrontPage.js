// import { useEffect, useState } from "react"
// import { getDownloadURL, ref } from "@firebase/storage"
import { auth, provider } from "../firebase"
// import { storage } from "../firebase"
import { signInWithRedirect } from "@firebase/auth"
import "./FrontPage.css"
// import useWindowDimensions from "../components/general/useWindowDimensions"

export const FrontPage = () => {

    // const [videoUrl, setVideoUrl] = useState("")
    // const { width } = useWindowDimensions()
    

    // const videoInit = async () => {
    //     const videoRef = ref(storage, "media/welcome-banner.mp4")
    //     const url = await getDownloadURL(videoRef)
    //     setVideoUrl(url)
    // }

    const signIn = async () => {
        signInWithRedirect(auth, provider)
    }

    // useEffect(() => {
    //     videoInit()
    // }, []) 

    return (
        <div className="front-page">
            {/* {width > 768 ? 
                <video src={videoUrl} className="front-page-media" type="video/mp4" alt="banner video" autoPlay muted loop>
                    Your browser does not support the video tag.
                </video>
            :
                <img 
                    className="front-page-media"
                    src="https://static.wixstatic.com/media/98a7e8_b2d44be3177a4d598b540ec68acd7d09~mv2.jpg/v1/fill/w_1436,h_886,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ELCA%202021-0503.jpg"
                    alt="elca"
                />
            } */}
            <img 
                className="front-page-media"
                src="https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Felca-front.jpeg?alt=media&token=a36e298e-5d0b-4a56-b002-ba0d9d27b177"
                alt=""
            />
            <div className="video-text">
                <h1 className="front-page-welcome-text">ELCA Student Government</h1>
                <p className="front-page-welcome-desc">All things SGA, all in one place.</p>
                <button className="btn open-login" onClick={signIn}>Sign In</button>
            </div>
        </div>  
    )
}

export default FrontPage;