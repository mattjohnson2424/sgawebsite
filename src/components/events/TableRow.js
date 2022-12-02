import { updateDoc, doc } from "@firebase/firestore"
import { useEffect, useState, memo } from "react"
import { db } from "../../firebase"
import { compareProps } from "../../helpers/memoHelpers"
import _ from "lodash"
import "./TableRow.css"

export const TableRow = memo(({id, user}) => {
    
    const [present, setPresent] = useState()

    const updateAttendance = async () => {

        const field = 'attendance.' + user.id + '.present'

        await updateDoc(doc(db, 'events', id), {
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
},  (prevProps, nextProps) => {

    if (!(prevProps.id === nextProps.id && _.isEqual(prevProps.user, nextProps.user))) {
        return false // causes rerender
    }
    return true
})

export default TableRow;