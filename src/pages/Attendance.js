import { useContext, useEffect, useState } from "react";
import { query, collection, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import UserContext from "../contexts/UserContext";
import MyAttendance from "../components/attendance/MyAttendance";
import AdminAttendance from "../components/attendance/AdminAttendance";
import EventContext from "../contexts/EventContext";

export const Attendance = () => {

    const [viewAsAdmin, setViewAsAdmin] = useState(true)
    const [events, setEvents] = useState([])
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
        // refreshEventUsers()
        eventsInit()  
    })
    
    return (
        <EventContext.Provider value={events}>
            <h1>Attendance</h1>
            <br/>
            {user.admin ? 
                <>
                    <button onClick={e => setViewAsAdmin(true)}>Admin Attendance</button>
                    <button onClick={e => setViewAsAdmin(false)}>My Attendance</button>
                    {viewAsAdmin ? <AdminAttendance/> : <MyAttendance/>}
                </> : <MyAttendance/>}
        </EventContext.Provider>
    )

}

export default Attendance;