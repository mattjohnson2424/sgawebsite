import React, { useState, useContext, useEffect } from "react"
import UserContext from "../../contexts/UserContext"
import { updateDoc, doc, deleteDoc } from "@firebase/firestore"
import { db } from "../../firebase"
import Delete from "../general/Delete"

export const Announcement = props => {

    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(props.announcement.name)
    const [description, setDescription] = useState(props.announcement.description)

    const user = useContext(UserContext)

    const onEdit = async () => {
        if (edit) {
            await updateDoc(doc(db, 'announcements', props.announcement.id), {
                name: name,
                description: description
            });
            setEdit(false)
        } else {
            setEdit(true)
        }
    }

    const onDelete = async () => {
        await deleteDoc(doc(db, 'announcements', props.announcement.id));
    }

    useEffect(() => {
        setName(props.announcement.name)
        setDescription(props.announcement.description)
    }, [props])

    return (
        <div className="announcement">
            {edit ? 
                (<>
                    <label htmlFor="edit-announcement-name" >Edit Name: </label>
                    <input id="edit-announcement-name" value={name} onChange={e => setName(e.target.value)}/>
                    <br/>
                </>):
            <h2>{name}</h2>}
            {edit ? 
                (<>
                    <label htmlFor="edit-announcement-description">Edit Description: </label>
                    <input id="edit-announcement-description" value={description} onChange={e => setDescription(e.target.value)}/>
                </>):
                <p>{description}</p>}
            <p>Posted on {props.announcement.date} by {props.announcement.postedBy}</p>
            {user.uid === props.announcement.postedByUID && <button onClick={onEdit}>{edit ? 'Save' : 'Edit'}</button>}
            {user.uid === props.announcement.postedByUID && <Delete onDelete={onDelete}>Delete</Delete>}
            
        </div>
    )
}