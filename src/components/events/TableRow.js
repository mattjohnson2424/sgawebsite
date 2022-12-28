import { updateDoc, doc } from "@firebase/firestore"
import { useState, memo, useEffect } from "react"
import { db } from "../../firebase"
import _ from "lodash"
import "./TableRow.css"

export const TableRow = memo(({ id, user }) => {
    
    const [present, setPresent] = useState(user.present)

    

    const updateAttendance = async () => {

        const field = 'attendance.' + user.id + '.present'

        const isPresent = present
        setPresent(!isPresent)

        await updateDoc(doc(db, 'events', id), {
            [field]: !isPresent
        });
    }

    useEffect(() => {
        setPresent(user.present)
    }, [user])


    return (
        <div onClick={updateAttendance} className={`event-attendance-table-row  ${present ? 'event-present' : 'event-not-present'}`}>
            {user.firstName} {user.lastName}
        </div> 
    )
},  (prevProps, nextProps) => {

    if (!(prevProps.id === nextProps.id && _.isEqual(prevProps.user, nextProps.user))) {
        return false // causes rerender
    }
    return true
})

export default TableRow;