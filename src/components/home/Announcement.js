import React, { useState, useContext, useEffect } from "react"
import UserContext from "../../contexts/UserContext"
import { updateDoc, doc, deleteDoc } from "@firebase/firestore"
import { db } from "../../firebase"
import Delete from "../general/Delete"
import Modal from "../general/Modal"

export const Announcement = props => {

    const [show, setShow] = useState(false)
    const [name, setName] = useState(props.announcement.name)
    const [description, setDescription] = useState(props.announcement.description)

    const user = useContext(UserContext)

    const editAnnouncement = async () => {
        await updateDoc(doc(db, 'announcements', props.announcement.id), {
            name: name,
            description: description
        });
        setShow(false)
    }

    const onDelete = async () => {
        await deleteDoc(doc(db, 'announcements', props.announcement.id));
    }

    const onClose = () => {
        setShow(false)
    }

    useEffect(() => {
        setName(props.announcement.name)
        setDescription(props.announcement.description)
    }, [props])

    return (
        <div className="announcement">
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Posted on {props.announcement.date} by {props.announcement.postedBy}</p>

            {user.admin && <>
                <button onClick={e => setShow(true)}>Edit</button>
                <Delete onDelete={onDelete}>Delete</Delete>
                <Modal show={show} onClose={onClose}>
                    <label htmlFor="edit-announcement-name" >Edit Name: </label>
                    <input id="edit-announcement-name" value={name} onChange={e => setName(e.target.value)}/>
                    <br/>
                    <label htmlFor="edit-announcement-description">Edit Description: </label>
                    <input id="edit-announcement-description" value={description} onChange={e => setDescription(e.target.value)}/>
                    <input type="submit" onClick={editAnnouncement}/>
                </Modal>
            </>}
        </div>
    )
}