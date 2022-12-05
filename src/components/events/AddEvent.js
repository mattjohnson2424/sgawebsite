import React, { useState, useContext } from "react";
import { getUser } from "../../helpers/backendHelpers"
import UserContext from "../../contexts/UserContext";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import useWindowDimensions from "../general/useWindowDimensions"
import Modal from "../general/Modal"
import dayjs from "dayjs";
import "./AddEvent.css"
import EventsContext from "../../contexts/EventsContext";


export const AddEvent = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"))
    const [eventType, setEventType] = useState("meeting")
    const [time, setTime] = useState("00:00")
    const [location, setLocation] = useState("")
    const [show, setShow] = useState(false)
    const { width } = useWindowDimensions()
    const { setShowLoadingScreen } = useContext(EventsContext)

    const user = useContext(UserContext)

    const onClose = () => {
        setName("")
        setDescription("")
        setDate(dayjs().format("YYYY-MM-DD"))
        setLocation("")
        setEventType("meeting")
        setTime("00:00")
        setLocation("")
        setShow(false)
    }

    const onSumbit = async e => {
        e.preventDefault()
        setShowLoadingScreen(true)

        const id = user.uid
        const userFromDb = await getUser(id)
        const postedBy = userFromDb.firstName + " " + userFromDb.lastName

        const eventTimestamp = Date.parse(date + " " + time)

        await addDoc(collection(db, 'events'), {
            name: name,
            description: description,
            date: date,
            time: time,
            postedBy: postedBy,
            takeAttendance: false,
            hasSignUps: false,
            signUps: {},
            maxSignUps: 0,
            hasMaxSignUps: false,
            attendance: {},
            eventType: eventType,
            location: location,
            formattedDate: dayjs(eventTimestamp).format("dddd, MMMM D [a]t h:mma"),
            timestamp: eventTimestamp
        });

        setName("")
        setDescription("")
        setDate("YYYY-MM-DD")
        setEventType("meeting")
        setTime("00:00")
        setLocation("")
        setShow(false)
        setShowLoadingScreen(false)
    }

    return (
        <>
            <button className={`btn open-add-event ${width < 768 && "plus"}`} onClick={e => setShow(true)}>{width >= 768 ? "Add Event" : "+"}</button>
            <Modal show={show} onClose={onClose}>
                <form id="add-event">
                    <h2>Add Event</h2>
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
                    <div className="select-event-type">
                        <div className="select-event-type-option" id={`${eventType === "meeting" && "event-type-selected"}`} onClick={() => setEventType("meeting")}>Meeting</div>
                        <div className="select-event-type-option" id={`${eventType === "service-project" && "event-type-selected"}`} onClick={() => setEventType("service-project")}>Service</div>
                        <div className="select-event-type-option" id={`${eventType === "schoolwide" && "event-type-selected"}`} onClick={() => setEventType("schoolwide")}>Schoolwide</div>
                        <div className="select-event-type-option" id={`${eventType === "other" && "event-type-selected"}`} onClick={() => setEventType("other")}>Other</div>
                    </div>
                    <label htmlFor="event-date">Event Date: </label>
                    <input id="event-date" type="date" value={date} onChange={e => setDate(e.target.value)}/>
                    <label htmlFor="event-time">Event Time: </label>
                    <input id="event-time" type="time" value={time} onChange={e => setTime(e.target.value)}/>
                    <br/>
                    <button className="btn submit-add-event" type="submit" onClick={onSumbit}>Sumbit</button>
                </form>   
            </Modal>  
        </>
    )
}

export default AddEvent;