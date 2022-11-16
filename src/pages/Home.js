import React, { useContext, useEffect } from "react"
import UserContext from '../contexts/UserContext'
import AddAnnouncement from "../components/home/AddAnnouncement";
import AnnouncementList from "../components/home/AnnouncementList";
import UserDashboard from "../components/home/UserDashboard";

export const Home = () => {

    const user = useContext(UserContext)

    useEffect(() => {
        document.getElementById("gallery-video").play()
    }, [])

    return (
        <div>
            {/* <p>{"You are logged in as " + user.email}</p> */}
            <div className="gallery">
                <video id="gallery-video" autoplay muted loop>
                    <source src="/media/large-elca-banner.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                <p className="welcome-text">Welcome {user.email}!</p>
            </div>
            <UserDashboard/>
            {user.admin && <AddAnnouncement/>}
            <AnnouncementList/>
        </div>
    )
}

export default Home;