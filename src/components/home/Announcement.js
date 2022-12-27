import React, { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import { doc, deleteDoc } from "@firebase/firestore"
import { db } from "../../firebase"
import Delete from "../general/Delete"
import './Announcement.css'
import EditAnnouncement from "./EditAnnouncement"
import HomeContext from "../../contexts/HomeContext"

export const Announcement = props => {

    const user = useContext(UserContext)
    const { setShowLoadingScreen } = useContext(HomeContext)

    const onDelete = async () => {
        setShowLoadingScreen(true)
        await deleteDoc(doc(db, 'announcements', props.announcement.id));
        setShowLoadingScreen(false)
    }

    return (
        <div className="announcement">
            <h2 className="announcement-title">{props.announcement.name}</h2>
            <p className="announcement-description">{props.announcement.description}</p>
            <p className="announcement-info">Posted on {props.announcement.date} by {props.announcement.postedBy}</p>
            {(user.admin || props.announcement.postedByUID === user.uid) && <>
                <div className="announcement-btn-group">
                    <EditAnnouncement announcement={props.announcement}/>
                    <Delete deleteText="Are you sure you want to delete this announcement?" className="btn announcement-btn delete-announcement-btn" onDelete={onDelete}>Delete</Delete>
                </div>
            </>}
        </div>
    )
}