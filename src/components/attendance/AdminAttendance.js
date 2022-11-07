import { useEffect, useState } from "react";
import { query, collection, onSnapshot} from "@firebase/firestore"
import { db } from "../../firebase"
import AdminAttendanceTable from "./AdminAttendanceTable"

export const AdminAttendance = () => {

    const [users, setUsers] = useState([])
    const [events, setEvents] = useState([])

    const usersInit = async () => {
        const q = query(collection(db, "users"));
        await onSnapshot(q, async querySnapshot => {
            const users = {};
            querySnapshot.forEach(doc => {
                users[doc.id] = {
                    ...doc.data(),
                    id: doc.id
                }
            })

            const keys = Object.keys(users)
            const usersArray = []
            keys.forEach(key => {
                usersArray.push(users[key])
            })
            usersArray.sort((a,b) => {
                if ((a.lastName + a.firstName).toLowerCase() > (b.lastName + b.firstName).toLowerCase()) {
                    return 1
                } else if ((b.lastName + b.firstName).toLowerCase() > (a.lastName + a.firstName).toLowerCase()) {
                    return -1
                } else {
                    return 0
                }
            })
            setUsers(usersArray)
            
        })
    }

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
            setEvents(dbEvents.filter(event => event.takeAttendance))
        })
    }

    useEffect(() => {
        eventsInit()
        usersInit()
    }, [])

    return (
        <>
            <h2>Meeting Attendance</h2>
            <AdminAttendanceTable users={users} events={events} eventType="meeting"/>
            <h2>Service Project Attendance</h2>
            <AdminAttendanceTable users={users} events={events} eventType="service-project"/>
            <h2>Other Attendance</h2>
            <AdminAttendanceTable users={users} events={events} eventType="other"/>
        </>
    )
}

export default AdminAttendance