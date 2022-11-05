import React, { useContext } from "react"
import UserContext from '../contexts/UserContext'
import Navbar from "../components/general/Navbar";
import AddAnnouncement from "../components/home/AddAnnouncement";
import AnnouncementList from "../components/home/AnnouncementList";

export const Home = () => {

    const user = useContext(UserContext)

    return (
        <div>
            <Navbar/>
            <p>{"You are logged in as " + user.email}</p>
            {user.admin && <AddAnnouncement/>}
            <AnnouncementList/>
        </div>
    )
}

export default Home;