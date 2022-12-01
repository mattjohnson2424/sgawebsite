import React, { useState, useEffect } from "react"
import Event from "./Event"
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../../firebase"
import "./EventList.css"

export const EventList = () => {

    const [events, setEvents] = useState([]);

    

    useEffect(() => {
        const eventsInit = async () => {
            const q = query(collection(db, "events"));
            await onSnapshot(q, (querySnapshot) => {
                const dbEvents = [];
                querySnapshot.forEach(doc => {
                    dbEvents.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setEvents(dbEvents.sort((a,b) => new Date(b.date) - new Date(a.date)))
            })
        }
        eventsInit()   
    }, [])

    return (
        <div className="event-list">
            {events.map((event, index) => {
                return (
                    <Event key={index} event={event}/>
                )   
            })}
        </div>
    )
}

export default EventList;