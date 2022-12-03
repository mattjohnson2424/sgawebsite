import { useEffect, useState } from "react";
import { query, collection, onSnapshot} from "@firebase/firestore"
import { db } from "../../firebase"
import AdminAttendanceTable from "./AdminAttendanceTable"
import "./AdminAttendance.css"

export const AdminAttendance = ({ events }) => {

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

                let aGrade;
                let bGrade;

                if (a.grade === "staff") {
                    aGrade = 13
                } else {
                    aGrade = parseInt(a.grade)
                }
                if (b.grade === "staff") {
                    bGrade = 13
                } else {
                    bGrade = parseInt(b.grade)
                }

                if(aGrade < bGrade) {
                    return -1
                } else if (aGrade > bGrade) {
                    return 1
                } else {
                    if ((a.firstName + a.lastName).toLowerCase() > (b.firstName + b.lastName).toLowerCase()) {
                        return 1
                    } else if ((b.firstName + b.lastName).toLowerCase() > (a.firstName + a.lastName).toLowerCase()) {
                        return -1
                    } else {
                        return 0
                    }
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
            <h2 className="category-title">Meeting Attendance</h2>
            <AdminAttendanceTable events={events} users={users} eventType="meeting"/>
            <h2 className="category-title">Service Project Attendance</h2>
            <AdminAttendanceTable events={events} users={users} eventType="service-project"/>
            <h2 className="category-title">Schoolwide Event Attendance</h2>
            <AdminAttendanceTable events={events} users={users} eventType="schoolwide"/>
            <h2 className="category-title">Other Attendance</h2>
            <AdminAttendanceTable events={events} users={users} eventType="other"/>
        </>
    )
}

export default AdminAttendance