import React, { useContext, useState } from "react"
import { doc, updateDoc } from "@firebase/firestore"
import { db } from "../../firebase"
import Modal from "../general/Modal"
import dayjs from "dayjs"
import "./EditEvent.css"
import EventsContext from "../../contexts/EventsContext"

export const EditEvent = ({ event }) => {

    const [name, setName] = useState(event.name)
    const [description, setDescription] = useState(event.description)
    const [date, setDate] = useState(event.date)
    const [eventType, setEventType] = useState(event.eventType)
    const [time, setTime] = useState(event.time)
    const [location, setLocation] = useState(event.location)

    const [show, setShow] = useState(false)
    const { setShowLoadingScreen } = useContext(EventsContext)

    const onSubmit = async e => {

        e.preventDefault()

        setShowLoadingScreen(true)

        const eventTimestamp = Date.parse(date + " " + time)

        await updateDoc(doc(db, 'events', event.id), {
            name: name,
            description: description,
            date: date,
            time: time,
            eventType: eventType,
            location: location,
            formattedDate: dayjs(eventTimestamp).format("dddd, MMMM D [a]t h:mma"),
            timestamp: eventTimestamp
        });
        setShow(false)
        setShowLoadingScreen(false)
    }

    const onClose = () => {
        setShow(false)
        setName(event.name)
        setDescription(event.description)
        setDate(event.date)
        setEventType(event.eventType)
        setTime(event.time)
        setLocation(event.location)
    }

    return (
        <>
            <button className="btn edit-event-btn" onClick={() => setShow(true)}>Edit</button>
            <Modal show={show} onClose={onClose}>
                <form id="edit-event">
                    <h2>Edit Event</h2>
                    <div className="input-group">
                        <input required id="event-name" type="text" value={name} onChange={e => setName(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="event-name">Name</label>
                    </div>
                    <div className="input-group">
                        <input required id="event-desc" type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="event-desc">Description</label>
                    </div>
                    <div className="input-group">
                        <input required id="event-location" type="text" value={location} onChange={e => setLocation(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="event-location">Location</label>
                    </div>
                    <label htmlFor="event-type">Event Type</label>
                    <div className="select-event-type">
                        <div className="select-event-type-option" id={`${eventType === "meeting" && "event-type-selected"}`} onClick={() => setEventType("meeting")}>Meeting</div>
                        <div className="select-event-type-option" id={`${eventType === "service-project" && "event-type-selected"}`} onClick={() => setEventType("service-project")}>Service</div>
                        <div className="select-event-type-option" id={`${eventType === "schoolwide" && "event-type-selected"}`} onClick={() => setEventType("schoolwide")}>Schoolwide</div>
                        <div className="select-event-type-option" id={`${eventType === "other" && "event-type-selected"}`} onClick={() => setEventType("other")}>Other</div>
                    </div>
                    <input id="event-date" type="date" value={date} onChange={e => setDate(e.target.value)}/>
                    <input id="event-time" type="time" value={time} onChange={e => setTime(e.target.value)}/>
                    <br/>
                    <button className="btn submit-edit-event" type="submit" onClick={onSubmit}>Save Changes</button>
                </form>
            </Modal>
        </>
    )
}

export default EditEvent