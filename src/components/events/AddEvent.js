import React, { useState, useContext } from "react";
import { getUser } from "../../helpers/backendHelpers"
import UserContext from "../../contexts/UserContext";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import dateFormat from "dateformat";
import Modal from "../general/Modal"
import "./AddEvent.css"


export const AddEvent = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [eventType, setEventType] = useState("meeting")
    const [time, setTime] = useState("")
    const [location, setLocation] = useState("")
    const [show, setShow] = useState(false)

    const user = useContext(UserContext)

    const onClose = () => {
        setShow(false)
    }

    const onSumbit = async e => {
        e.preventDefault()

        const id = user.uid
        const userFromDb = await getUser(id)
        const postedBy = userFromDb.firstName + " " + userFromDb.lastName

        await addDoc(collection(db, 'events'), {
            name: name,
            date: date,
            description: description,
            postedBy: postedBy,
            takeAttendance: false,
            hasSignUps: false,
            signUps: {},
            maxSignUps: null,
            attendance: {},
            eventType: eventType,
            location: location,
            time: dateFormat(Date.parse(date + " " + time), "h:MM TT")
        });

        setName("")
        setDescription("")
        setDate("")
        setEventType("meeting")
        setTime("")
        setLocation("")
    }

    return (
        <>
            <button className="open-add-event" onClick={e => setShow(true)}>+</button>
            <Modal show={show} onClose={onClose}>
                <form id="add-event">
                    <h2>Add Event</h2>
                    <label htmlFor="event-name">Event Name: </label>
                    <input id="event-name" type="text" value={name} onChange={e => setName(e.target.value)}/>
                    <br/>
                    <label htmlFor="event-desc">Event Description: </label>
                    <input id="event-desc" type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                    <br/>
                    <label htmlFor="event-type">Event Type</label>
                    <select value={eventType} id="event-type" name="event-type" onChange={e => setEventType(e.target.value)}>
                        <option value="meeting">Meeting</option>
                        <option value="service-project">Service Project</option>
                        <option value="other">Other</option>
                    </select>
                    <br/>
                    <label htmlFor="event-location">Event Location</label>
                    <input id="event-location" type="text" value={location} onChange={e => setLocation(e.target.value)}/>
                    <br/>
                    <label htmlFor="event-date">Event Date: </label>
                    <input id="event-date" type="date" value={date} onChange={e => setDate(e.target.value)}/>
                    <br/>
                    <label htmlFor="event-time">Event Time: </label>
                    <input id="event-time" type="time" value={time} onChange={e => setTime(e.target.value)}/>
                    <br/>
                    <input type="submit" onClick={onSumbit}/>
                </form>   
            </Modal>  
        </>
    )
}

export default AddEvent;