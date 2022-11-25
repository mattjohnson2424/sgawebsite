import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../../firebase"
import { Announcement } from "./Announcement";
import "./AnnouncementList.css"

export const AnnouncementList = () => {

    const [announcements, setAnnouncements] = useState([]);

    const announcementsInit = async () => {
        const q = query(collection(db, "announcements"));
        await onSnapshot(q, (querySnapshot) => {
            const dbAnnouncements = [];
            querySnapshot.forEach(doc => {
                dbAnnouncements.push(
                    {
                        id: doc.id,
                        ...doc.data()
                    }
                )
            })
            setAnnouncements(dbAnnouncements)
        })
    }

    useEffect(() => {
        announcementsInit()
    }, [])

    return (
        <div className="announcement-list">
            {announcements.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).map((announcement, index) => {
                return (
                    <Announcement key={index} announcement={announcement}/>
                )
            })}
        </div>
    )
}

export default AnnouncementList;