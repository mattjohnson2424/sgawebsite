import React, { useState, useContext } from "react";
import { addAnnouncement } from "../../helpers/backendHelpers";
import dateFormat from "dateformat";
import UserContext from "../../contexts/UserContext"
import { getUser } from "../../helpers/backendHelpers";
import Modal from "../general/Modal";
import "./AddAnnouncement.css"
import useWindowDimensions from "../general/useWindowDimensions";

export const AddAnnouncement = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [show, setShow] = useState(false)
    const { width } = useWindowDimensions()

    const user = useContext(UserContext)

    const onSubmit = async e => {

        e.preventDefault()
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

    const onClose = () => {
        setShow(false)
        setName("")
        setDescription("")
    }


    return (
        <>  
            <button className={`btn open-add-announcement ${width < 768 && "plus"}`} onClick={e => setShow(true)}>{width >= 768 ? "Add Announcement" : "+"}</button>
            <Modal show={show} onClose={onClose}>
                <form className="add-announcement">
                    <h2>Add Announcement</h2>
                    <div className="input-group">
                        <input required id="add-announcement-name" type="text" value={name} onChange={e =>setName(e.target.value)}/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="add-announcement-name" >Name</label>
                    </div>
                    <div className="input-group">
                        <textarea required className="txtarea" id="add-announcement-description" value={description} onChange={e => setDescription(e.target.value)}/>
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label htmlFor="add-announcement-description">Description</label>
                    </div>
                    <input className="btn submit-add-announcement" type="submit" onClick={onSubmit}/>
                </form>
            </Modal>      
        </>       
    )
}

export default AddAnnouncement;