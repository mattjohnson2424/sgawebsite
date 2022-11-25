import React, { useContext } from "react"
import UserContext from '../contexts/UserContext'
import AddAnnouncement from "../components/home/AddAnnouncement";
import AnnouncementList from "../components/home/AnnouncementList";
import UserDashboard from "../components/home/UserDashboard";
import WelcomeVideo from "../components/home/WelcomeVideo";

export const Home = () => {

    const user = useContext(UserContext)

    return (
        <>
            <WelcomeVideo/>
            <UserDashboard/>
            {user.admin && <AddAnnouncement/>}
            <AnnouncementList/>
        </>
    )
}

export default Home;