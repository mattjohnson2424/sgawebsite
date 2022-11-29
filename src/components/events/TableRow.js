import { updateDoc, doc } from "@firebase/firestore"
import { useContext, useEffect, useState } from "react"
import EventContext from "../../contexts/EventContext"
import { db } from "../../firebase"
import "./TableRow.css"

export const TableRow = props => {
    
    const [present, setPresent] = useState()
    const event = useContext(EventContext)

    const updateAttendance = async () => {

        const field = 'attendance.' + props.user.id + '.present'

        await updateDoc(doc(db, 'events', event.id), {
            [field]: !present
        });
    }

    useEffect(() => {
        setPresent(props.user.present)
    },[props])

    return (
        <div className="event-attendance-table-row">
            <div className="event-attendance-table-item">{props.user.firstName} {props.user.lastName}</div>
            <div className="event-attendance-table-item">
                <button className={`btn event-attendance-btn ${present ? 'present' : 'not-present'}`} onClick={updateAttendance}>{present ? 'Present' : 'Not Present'}</button>
            </div>
        </div> 
    )
}

export default TableRow;