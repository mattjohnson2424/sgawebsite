import React, { useState, useContext } from "react";
import { getUser } from "../../helpers/backendHelpers"
import UserContext from "../../contexts/UserContext";
import { query, collection, addDoc, getDocs } from "@firebase/firestore";
import { db } from "../../firebase";


export const AddEvent = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [eventType, setEventType] = useState("meeting")

    const user = useContext(UserContext)

    const onSumbit = async e => {
        e.preventDefault()

        const id = user.uid
        const userFromDb = await getUser(id)
        const postedBy = userFromDb.firstName + " " + userFromDb.lastName

        const q = query(collection(db, "users"));
        const users = {};
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
            users[doc.id] = {
                present: false,
                ...doc.data()
            }
        })

        await addDoc(collection(db, 'events'), {
            name: name,
            date: date,
            description: description,
            postedBy: postedBy,
            takeAttendance: false,
            attendance: users,
            eventType: eventType
        });

        setName("")
        setDescription("")
        setDate("")
        setEventType("meeting")
    }

    return (
        <form id="add-event">
            <h2>Add Event</h2>
            <label htmlFor="event-name">Event Name: </label>
            <input id="event-name" type="text" value={name} onChange={e => setName(e.target.value)}/>
            <br/>
            <label htmlFor="event-desc">Event Description: </label>
            <input id="event-desc" type="text" value={description} onChange={e => setDescription(e.target.value)}/>
            <br/>
            <label for="event-type">Event Type</label>
            <select value={eventType} id="event-type" name="event-type" onChange={e => setEventType(e.target.value)}>
                <option value="meeting">Meeting</option>
                <option value="service-project">Service Project</option>
                <option value="other">Other</option>
            </select>
            <br/>
            <label htmlFor="event-date">Event Date: </label>
            <input id="event-date" type="date" value={date} onChange={e => setDate(e.target.value)}/>
            <input type="submit" onClick={onSumbit}/>
        </form>
    )
}

export default AddEvent;