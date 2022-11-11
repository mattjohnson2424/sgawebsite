import { useEffect, useState } from "react";
import { query, collection, onSnapshot} from "@firebase/firestore"
import { db } from "../../firebase"
import AdminAttendanceTable from "./AdminAttendanceTable"

export const AdminAttendance = () => {

    const [users, setUsers] = useState([])

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

    useEffect(() => {
        usersInit()
    }, [])

    return (
        <>
            <h2>Meeting Attendance</h2>
            <AdminAttendanceTable users={users} eventType="meeting"/>
            <h2>Service Project Attendance</h2>
            <AdminAttendanceTable users={users} eventType="service-project"/>
            <h2>Other Attendance</h2>
            <AdminAttendanceTable users={users} eventType="other"/>
        </>
    )
}

export default AdminAttendance