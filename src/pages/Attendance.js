import { useContext, useEffect, useState } from "react";
import { query, collection, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import UserContext from "../contexts/UserContext";
import MyAttendance from "../components/attendance/MyAttendance";
import AdminAttendance from "../components/attendance/AdminAttendance";
import "./Attendance.css"

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
            setEvents(dbEvents.sort((a,b) => new Date(a.date) - new Date(b.date)))
        })
    }

    useEffect(() => {
        eventsInit()  
    })
    
    return (
        <>
            {user.admin ? 
                <>  
                    <div className="select-attendance">
                        <button id={`${viewAsAdmin && "attendance-selected"}`} className="select-attendance-option" onClick={() => setViewAsAdmin(true)}>Admin Attendance</button>
                        <button id={`${!viewAsAdmin && "attendance-selected"}`} className="select-attendance-option" onClick={() => setViewAsAdmin(false)}>My Attendance</button>
                    </div>
                    {viewAsAdmin ? <AdminAttendance events={events}/> : <MyAttendance events={events}/>}
                </> : 
                <MyAttendance events={events}/>
            }
        </>
    )

}

export default Attendance;