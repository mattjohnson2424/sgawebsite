import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"
import UserContext from "../contexts/UserContext";

export const Attendance = () => {

    const [events, setEvents] = useState([]);
    const user = useContext(UserContext)

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
            <Link to="/">Back to Home</Link>
            <table>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Present</th>
                    </tr>
                </thead>
                <tbody>
                    {events.sort((a,b) => new Date(b.date) - new Date(a.date)).filter(event => event.takeAttendance).map((event, index) => {
                        return (
                            <tr key={index}>
                                <td>{event.name}</td>
                                <td>{event.date}</td>
                                <td>{event['attendance'][user.uid]['present'] ? "Present" : "Absent"}</td>
                            </tr>
                        )   
                    })}
                </tbody>
            </table>
        </>
    )

}

export default Attendance;