import React, { useState, useEffect, useContext } from "react"
import { auth } from "../firebase";
import { onAuthStateChanged } from "@firebase/auth";
import UserContext from '../contexts/UserContext'
import SignUp from "../components/home/SignUp";
import Login from "../components/home/Login";
import Navbar from "../components/home/Navbar";
import AddAnnouncement from "../components/home/AddAnnouncement";
import AnnouncementList from "../components/home/AnnouncementList";

export const Home = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    const user = useContext(UserContext)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false)
            }
        })
    }, [])

    return (
        <div>
            <Navbar/>
            <p>{loggedIn ? "You are logged in as " + user.email : "Please log in"}</p>
            {user !== null ? 
                <>
                    <AddAnnouncement/>
                    <AnnouncementList/>
                </> : 
                <>
                    <Login/>
                    <SignUp/>
                </>
            }
            
            

        </div>
    )
}

export default Home;