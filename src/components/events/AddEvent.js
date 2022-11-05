import React, { useState, useContext } from "react";
import { getUser } from "../../helpers/backendHelpers"
import UserContext from "../../contexts/UserContext";
import { query, onSnapshot, collection, addDoc } from "@firebase/firestore";
import { db } from "../../firebase";


export const AddEvent = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")

    const user = useContext(UserContext)

    const onSumbit = async e => {
        e.preventDefault()

        const id = user.uid
        const userFromDb = await getUser(id)
        const postedBy = userFromDb.firstName + " " + userFromDb.lastName

        const q = query(collection(db, "users"));
        await onSnapshot(q, async querySnapshot => {
            const users = {};
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
                attendance: users
            });
            
        })

        setName("")
        setDescription("")
        setDate("")
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
            <label htmlFor="event-date">Event Date: </label>
            <input id="event-date" type="date" value={date} onChange={e => setDate(e.target.value)}/>
            <input type="submit" onClick={onSumbit}/>
        </form>
    )
}

export default AddEvent;