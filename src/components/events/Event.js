import React, { useContext, useState } from "react"
import AttendanceTableGroup from "./AttendanceTableGroup"
import Delete from "../general/Delete"
import { doc, deleteDoc, updateDoc } from "@firebase/firestore"
import { db } from "../../firebase"
import EventContext from "../../contexts/EventContext"
import UserContext from "../../contexts/UserContext"
import EventSignUpMenu from "./EventSignUpMenu"
import EventSignUpTable from "./EventSignUpTable"
import EditEvent from "./EditEvent"
import EventBody from "./EventBody"
import SignUpForEvent from "./SignUpForEvent"

export const Event = () => {

    const [showAttendance, setShowAttendance] = useState(false)
    const [showSignUps, setShowSignUps] = useState(false)
    const event = useContext(EventContext)
    const user = useContext(UserContext)

    const addAttendance = async () => {
        await updateDoc(doc(db, 'events', event.id), {
            takeAttendance: true
        });
        setShowAttendance(true)
    }

    const deleteAttendance = async () => {
        await updateDoc(doc(db, 'events', event.id), {
            takeAttendance: false
        });
    }

    const deleteSignUps = async () => {
        await updateDoc(doc(db, 'events', event.id), {
            hasSignUps: false,
            signUps: {}
        });
    }

    const onDelete = async () => {
        await deleteDoc(doc(db, 'events', event.id));
    }

    return (
        <div className="event">
            <EventBody/>
            <SignUpForEvent/>
            {user.admin && 
                <>
                    <EditEvent/>
                    <Delete onDelete={onDelete}>Delete Event</Delete>
                </>
            }
            {(user.admin || user.officer) && (
                <>
                {event.takeAttendance ? 
                    <>
                        {showAttendance ? 
                            <>
                                <button onClick={e => setShowAttendance(false)}>Hide Attendance</button>
                                <AttendanceTableGroup/>
                            </> : 
                            <button onClick={e => setShowAttendance(true)}>Show Attendance</button> 
                        }
                        {user.admin && <Delete onDelete={deleteAttendance}>Delete Attendance</Delete>}
                    </> : 
                    <>
                        {user.admin && <button onClick={addAttendance}>Add Attendance</button>}
                    </>
                }
                
                {user.admin && event.hasSignUps ? 
                    <>
                        {showSignUps ? 
                            <>
                                <button onClick={e => setShowSignUps(false)}>Hide Sign Ups</button>
                                <EventSignUpTable/>                              
                            </> : 
                            <button onClick={e => setShowSignUps(true)}>Show Sign Ups</button>}
                            <Delete onDelete={deleteSignUps}>Delete Sign Ups</Delete>
                    </> : <EventSignUpMenu/>}
                
            </>
            )}
            
            
        </div>
    )
    
}

export default Event;