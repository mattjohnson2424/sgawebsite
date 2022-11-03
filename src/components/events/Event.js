import React, { useState } from "react"
import AttendanceTable from "./AttendanceTable"
import Delete from "../general/Delete"
import { updateEvent } from "../../helpers/backendHelpers"
import { doc, deleteDoc, updateDoc } from "@firebase/firestore"
import { db } from "../../firebase"

export const Event = props => {

    const [showAttendance, setShowAttendance] = useState(false)

    const addAttendance = async () => {
        await updateEvent(props.event.id, {
            takeAttendance: true
        })
        setShowAttendance(true)
    }

    const onDelete = async () => {
        await deleteDoc(doc(db, 'events', props.event.id));
    }

    const deleteAttendance = async () => {
        await updateDoc(doc(db, 'events', props.event.id), {
            takeAttendance: false
        });
    }

    const pullNewUsers = async () => {
        
    }

    return (
        <div className="event">
            <h2>{props.event.name}</h2>
            <p>{props.event.description}</p>
            <p>Posted on {props.event.date} by {props.event.postedBy}</p>
            <Delete onDelete={onDelete} collection="events" id={props.event.id}>Delete</Delete>
            {props.event.takeAttendance ? (props.event.takeAttendance && showAttendance) ? 
                <>
                    <button onClick={e => setShowAttendance(false)}>Hide Attendance</button>
                    <button onClick={pullNewUsers}>Pull New Users</button>
                    <Delete onDelete={deleteAttendance}>Delete Attendance</Delete>
                    <AttendanceTable event={props.event}/>
                </> : <button onClick={e => setShowAttendance(true)}>Show Attendance</button> : <button onClick={addAttendance}>Add Attendance</button>}
            
        </div>
    )
    
}

export default Event;