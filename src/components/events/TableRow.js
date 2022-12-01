import { updateDoc, doc } from "@firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import "./TableRow.css"

export const TableRow = ({ event , user }) => {
    
    const [present, setPresent] = useState()

    const updateAttendance = async () => {

        const field = 'attendance.' + user.id + '.present'

        await updateDoc(doc(db, 'events', event.id), {
            [field]: !present
        });
    }

    useEffect(() => {
        setPresent(user.present)
    },[user])

    return (
        <div className="event-attendance-table-row">
            <div className="event-attendance-table-item">{user.firstName} {user.lastName}</div>
            <div className="event-attendance-table-item">
                <button className={`btn event-attendance-btn ${present ? 'event-present' : 'event-not-present'}`} onClick={updateAttendance}>{present ? 'Present' : 'Not Present'}</button>
            </div>
        </div> 
    )
}

export default TableRow;