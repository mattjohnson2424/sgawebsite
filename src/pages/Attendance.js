import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { query, collection, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import UserContext from "../contexts/UserContext";
import MyAttendance from "../components/attendance/MyAttendance";
import AdminAttendance from "../components/attendance/AdminAttendance";
import Navbar from "../components/general/Navbar"
import EventContext from "../contexts/EventContext";
import { refreshEventUsers } from "../helpers/backendHelpers";

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
        refreshEventUsers()
        eventsInit()  
    })
    
    return (
        <EventContext.Provider value={events}>
            <Navbar/>
            <h1>Attendance</h1>
            <Link to="/">Back to Home</Link>
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