import { updateDoc, doc } from "@firebase/firestore"
import { useContext, useEffect, useState } from "react"
import EventContext from "../../contexts/EventContext"
import { db } from "../../firebase"

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
        <tr>
            <td>{props.user.lastName + ", " + props.user.firstName}</td>
            <td><button className={present ? 'present' : 'not-present'} onClick={updateAttendance}>{present ? 'Present' : 'Not Present'}</button></td>
        </tr>
    )
}

export default TableRow;