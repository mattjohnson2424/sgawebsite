import React, { useState, useContext } from "react";
import { addAnnouncement } from "../../helpers/backendHelpers";
import dateFormat from "dateformat";
import UserContext from "../../contexts/UserContext"
import { getUser } from "../../helpers/backendHelpers";
import Modal from "../general/Modal";

export const AddAnnouncement = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [show, setShow] = useState(false)

    const user = useContext(UserContext)

    const onSumbit = async e => {

        setShow(false)

        const now = Date.now()

        const id = user.uid
        const userFromDb = await getUser(id)
        const postedBy = userFromDb.firstName + " " + userFromDb.lastName

        addAnnouncement({
            name: name,
            description: description,
            date: dateFormat(now, "dddd, mmmm dS, yyyy, h:MM TT"),
            timestamp: now,
            postedBy: postedBy,
            postedByUID: id
        })
        
        setName("")
        setDescription("")
    }

    const onCancel = () => {
        setName("")
        setDescription("")
        setShow(false)
    }

    const onClose = () => {
        setShow(false)
    }

    return (
        <>
            <button onClick={e => setShow(true)}>Add Announcement</button>
            <Modal show={show} onClose={onClose}>
                <form id="add-announcement">
                    <h2>Add Announcement</h2>
                    <label htmlFor="announcement-name">Announcement Name: </label>
                    <input id="announcement-name" type="text" value={name} onChange={e => setName(e.target.value)}/>
                    <br/>
                    <label htmlFor="announcement-desc">Announcement Description: </label>
                    <input id="announcement-desc" type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                    <br/>
                    <button onClick={onCancel}>Cancel</button>
                    <input type="submit" onClick={onSumbit}/>
                </form>
            </Modal>      
        </>       
    )
}

export default AddAnnouncement;