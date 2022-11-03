import { updateDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase"

export const TableRow = props => {

    const updateAttendance = async () => {
        
        await updateDoc(doc(db, 'events', props.events.id), {
            
        });
    }

    return (
        <tr key={props.key}>
            <td>{props.user.firstName}</td>
            <td><button onClick={updateAttendance}>Present</button></td>
        </tr>
    )
}

export default TableRow;