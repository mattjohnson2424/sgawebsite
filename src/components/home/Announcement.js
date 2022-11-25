import React, { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import { doc, deleteDoc } from "@firebase/firestore"
import { db } from "../../firebase"
import Delete from "../general/Delete"
import './Announcement.css'
import EditAnnouncement from "./EditAnnouncement"

export const Announcement = props => {

    const user = useContext(UserContext)

    const onDelete = async () => {
        await deleteDoc(doc(db, 'announcements', props.announcement.id));
    }

    return (
        <div className="announcement">
            <h2 className="announcement-title">{props.announcement.name}</h2>
            <p className="announcement-description">{props.announcement.description}</p>
            <p className="announcement-info">Posted on {props.announcement.date} by {props.announcement.postedBy}</p>
            {user.admin && <>
                <div className="announcement-btn-group">
                    <EditAnnouncement announcement={props.announcement}/>
                    <Delete className="btn announcement-btn delete-announcement-btn" onDelete={onDelete}>Delete</Delete>
                </div>
            </>}
        </div>
    )
}