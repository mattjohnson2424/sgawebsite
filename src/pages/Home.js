import React, { useContext, useEffect } from "react"
import UserContext from '../contexts/UserContext'
import AddAnnouncement from "../components/home/AddAnnouncement";
import AnnouncementList from "../components/home/AnnouncementList";
import UserDashboard from "../components/home/UserDashboard";
import { refreshEventUsers } from "../helpers/backendHelpers";

export const Home = () => {

    const user = useContext(UserContext)

    useEffect(() => {
        refreshEventUsers()
    }, [])

    return (
        <div>
            {/* <p>{"You are logged in as " + user.email}</p> */}
            <div className="gallery">
                <video id="gallery-video" autoPlay muted loop>
                    <source src="/media/large-elca-banner.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                <p className="welcome-text">Welcome {user.firstName}!</p>
            </div>
            <UserDashboard/>
            {user.admin && <AddAnnouncement/>}
            <AnnouncementList/>
        </div>
    )
}

export default Home;