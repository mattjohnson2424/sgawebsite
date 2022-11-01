import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents, addEvent } from "../helpers/backendHelpers";

export const Events = () => {

    const [events, setEvents] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")

    const eventInit = async () => {
        const events = await getEvents()
        setEvents(events)
    }

    const onNameChange = e => {
        setName(e.target.value)
    }

    const onDescriptionChange = e => {
        setDescription(e.target.value)
    }

    const onDateChange = e => {
        setDate(e.target.value)
    }

    const onSubmit = async () => {

        const newEvent = {
            name: name,
            description: description,
            date: date
        }

        setName("")
        setDescription("")
        setDate("")
        
        setEvents(events => [...events, newEvent])

        await addEvent(newEvent)



    }

    useEffect(() => {
        eventInit();
    }, [])

    return (
        <div>
            <h1>Events</h1>
            <Link to="/">Back to home</Link>
            <div id="event-list">
                {events.sort((a,b) => new Date(b.date) - new Date(a.date)).map((event, index) => {
                    return (
                        <div key={index} className="event">
                            <h2>{event.name}</h2>
                            <p>{event.description}</p>
                            <p>{event.date}</p>
                        </div>
                    )
                })}
            </div>
            <label for="event-name">Event Name: </label>
            <input id="event-name" type="text" value={name} onChange={onNameChange}/>
            <br/>
            <label for="event-desc">Event Description: </label>
            <input id="event-desc" type="text" value={description} onChange={onDescriptionChange}/>
            <br/>
            <label for="event-date">Event Date: </label>
            <input id="event-date" type="date" value={date} onChange={onDateChange}/>
            
            <button onClick={onSubmit}>Add Event</button>
        </div>
    )
}

export default Events;