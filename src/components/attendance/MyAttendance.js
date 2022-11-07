import { useEffect, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"
import AttendanceInfo from "./AttendanceInfo";
import MeetingStatus from "./MeetingStatus";
import ServiceProjectStatus from "./ServiceProjectStatus";
import OtherEventsStatus from "./OtherEventsStatus";

export const MyAttendance = () => {

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
        <>
            <h1>My Attendance</h1>
            <h2>Meetings</h2>
            <MeetingStatus events={events}/>
            <AttendanceInfo events={events} eventType={"meeting"}/>
            <h2>Service Projects</h2>
            <ServiceProjectStatus events={events}/>
            <AttendanceInfo events={events} eventType={"service-project"}/>
            <h2>Other Events</h2>
            <OtherEventsStatus events={events}/>
            <AttendanceInfo events={events} eventType={"other"}/>
        </>
    )

}

export default MyAttendance;