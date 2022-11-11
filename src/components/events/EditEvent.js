import React, { useContext, useState } from "react"
import { doc, updateDoc } from "@firebase/firestore"
import { db } from "../../firebase"
import EventContext from "../../contexts/EventContext"
import Modal from "../general/Modal"
import dateFormat from "dateformat";

export const EditEvent = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [eventType, setEventType] = useState("meeting")
    const [time, setTime] = useState("")
    const [location, setLocation] = useState("")

    const [show, setShow] = useState(false)

    const event = useContext(EventContext)

    const onSubmit = async e => {

        e.preventDefault()

        await updateDoc(doc(db, 'events', event.id), {
            name: name,
            date: date,
            description: description,
            eventType: eventType,
            location: location,
            time: dateFormat(Date.parse(date + " " + time), "h:MM TT")
        });
        setShow(false)
    }

    const onClose = () => {
        setShow(false)
    }

    return (
        <>
            <button onClick={e => setShow(true)}>Edit</button>
            <Modal show={show} onClose={onClose}>
                <form id="edit-event">
                    <h2>Edit Event</h2>
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
                    <input type="submit" onClick={onSubmit}/>
                </form>
            </Modal>
        </>
    )
}

export default EditEvent