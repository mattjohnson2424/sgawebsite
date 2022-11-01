import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAnnouncements, addAnnouncement } from "../helpers/backendHelpers"

export const Home = () => {

    const [announcements, setAnnouncements] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const announcementInit = async () => {
        const announcements = await getAnnouncements()
        setAnnouncements(announcements)
    }

    const onNameChange = e => {
        setName(e.target.value)
    }

    const onDescriptionChange = e => {
        setDescription(e.target.value)
    }

    const onSubmit = async () => {

        const newAnnouncement = {
            name: name,
            description: description,
            date: new Date()
        }

        setAnnouncements(announcements => [...announcements, newAnnouncement])

        setName("")
        setDescription("")

        await addAnnouncement(newAnnouncement)

    }

    useEffect(() => {
        announcementInit();
    }, [])

    return (
        <div>
            <h1>Home/Announcements</h1>
            <Link to="/attendance">attendance</Link>
            <br/>
            <Link to="/events">events</Link>
            <br/>
            <Link to="/calendar">Calendar</Link>
            <br/>
            <Link to="/teams">teams</Link>
            <br/>
            <Link to="/socials">social media</Link>
            <br/>
            <Link to="/bios">Bios</Link>
            <br/>
            <h1>Announcements</h1>
            <div id="announcement-list">
                {announcements.map((announcement, index) => {
                    return (
                        <div key={index} className="announcement">
                            <h2>{announcement.name}</h2>
                            <p>{announcement.description}</p>
                            <p>{announcement.date.toString()}</p>
                        </div>
                    )
                })}
            </div>
            <label for="announcement-name">Announcement Name: </label>
            <input id="announcement-name" type="text" value={name} onChange={onNameChange}/>
            <br/>
            <label for="announcement-desc">Announcement Description: </label>
            <input id="announcement-desc" type="text" value={description} onChange={onDescriptionChange}/>
            
            <button onClick={onSubmit}>Add Announcement</button>
        </div>
    )
}

export default Home;