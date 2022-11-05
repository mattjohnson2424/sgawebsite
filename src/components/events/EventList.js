import React, { useState, useEffect } from "react"
import Event from "./Event"
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../../firebase"
import EventContext from "../../contexts/EventContext";

export const EventList = () => {

    const [events, setEvents] = useState([]);

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
        setEvents(dbEvents)
    })
    }

    useEffect(() => {
        eventsInit()
    }, [])

    return (
        <div className="event-list">
            {events.sort((a,b) => new Date(b.date) - new Date(a.date)).map((event, index) => {
                return (
                    <EventContext.Provider key={index} value={event}>
                        <Event/>
                    </EventContext.Provider>
                )   
            })}
        </div>
    )
}

export default EventList;