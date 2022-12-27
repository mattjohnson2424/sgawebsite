import React, { useState, useContext } from "react";
import { addAnnouncement } from "../../helpers/backendHelpers";
import dayjs from "dayjs";
import UserContext from "../../contexts/UserContext"
import { getUser } from "../../helpers/backendHelpers";
import Modal from "../general/Modal";
import "./AddAnnouncement.css"
import useWindowDimensions from "../general/useWindowDimensions";
import HomeContext from "../../contexts/HomeContext";

export const AddAnnouncement = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [show, setShow] = useState(false)
    const [allowText, setAllowText] = useState(true)
    const { setShowLoadingScreen } = useContext(HomeContext)
    const { width } = useWindowDimensions()

    const user = useContext(UserContext)

    const onSubmit = async e => {

        e.preventDefault()
        setShowLoadingScreen(true)

        setShow(false)

        const now = Date.now()

        const userFromDb = await getUser(user.uid)
        const postedBy = userFromDb.firstName + " " + userFromDb.lastName

        addAnnouncement({
            name: name,
            description: description,
            date: dayjs(now).format("dddd, MMMM D [a]t h:mma"),
            timestamp: now,
            postedBy: postedBy,
            postedByUID: user.uid,
            allowText: allowText
        })
        
        setName("")
        setDescription("")
        setAllowText(true)
        setShowLoadingScreen(false)
    }

    const onClose = () => {
        setShow(false)
        setName("")
        setDescription("")
        setAllowText(true)
    }

    const changeAlertOptions = () => {
        setAllowText(!allowText)
    }

    return (
        <>  
            <button className={`btn open-add-announcement ${width < 768 && "plus"}`} onClick={e => setShow(true)}>{width >= 768 ? "Add Announcement" : "+"}</button>
            <Modal show={show} onClose={onClose}>
                <form className="add-announcement">
                    <h2>Add Announcement</h2>
                    <div className="input-group">
                        <input required id="add-announcement-name" type="text" value={name} onChange={e =>setName(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="add-announcement-name" >Name</label>
                    </div>
                    <div className="input-group">
                        <textarea required className="txtarea" id="add-announcement-description" value={description} onChange={e => setDescription(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="add-announcement-description">Description</label>
                    </div>
                    <div className="text-alert-row" onClick={changeAlertOptions}>
                        <div className="checkbox">{allowText && <p>&#10004;</p>}</div>
                        <p>Text Alert Users</p>
                    </div>
                    <br/>
                    <input className="btn submit-add-announcement" type="submit" onClick={onSubmit}/>
                </form>
            </Modal>      
        </>       
    )
}

export default AddAnnouncement;