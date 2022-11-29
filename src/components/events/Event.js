import React, { useContext, useState } from "react"
import AttendanceTableGroup from "./AttendanceTableGroup"
import Delete from "../general/Delete"
import { doc, deleteDoc, updateDoc, query, collection, getDocs } from "@firebase/firestore"
import { db } from "../../firebase"
import EventContext from "../../contexts/EventContext"
import UserContext from "../../contexts/UserContext"
import EventSignUpMenu from "./EventSignUpMenu"
import EventSignUpTable from "./EventSignUpTable"
import EditEvent from "./EditEvent"
import EventBody from "./EventBody"
import SignUpForEvent from "./SignUpForEvent"
import "./Event.css"

export const Event = () => {

    const [showAttendance, setShowAttendance] = useState(false)
    const [showSignUps, setShowSignUps] = useState(false)
    const event = useContext(EventContext)
    const user = useContext(UserContext)

    const addAttendance = async () => {
        const q = query(collection(db, "users"));
        const users = {};
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
            users[doc.id] = {
                present: false,
                ...doc.data()
            }
        })
        await updateDoc(doc(db, 'events', event.id), {
            attendance: users,
            takeAttendance: true
        });
        setShowAttendance(true)
    }

    const deleteAttendance = async () => {
        await updateDoc(doc(db, 'events', event.id), {
            attendance: {},
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
            <div className="padded-event-body">
                <EventBody/>
                <SignUpForEvent/>
                {user.admin && !event.takeAttendance && <button className="btn add-attendance-btn" onClick={addAttendance}>Add Attendance</button>}
            </div>
            {user.officer && (
                <>
                    {event.takeAttendance &&
                        <div className={`event-attendance-container ${showAttendance ? "attendance-shown" : "attendance-hidden"}`}>
                        
                            <div className={`toggle-show-attendance ${showAttendance ? "attendance-shown-btn" : "attendance-hidden-btn"}`} onClick={() => setShowAttendance(!showAttendance)}>{showAttendance ? "Hide" : "Show"} Attendance</div>
                            {showAttendance &&
                                <div className='event-attendance-container-body'>
                                    {showAttendance && <>
                                        <div className="separating-line event-separator"></div>
                                        <AttendanceTableGroup/>
                                        {user.admin && <Delete className="btn delete-attendance-btn" deleteText="Are you sure you want to delete the attendance for this event?" onDelete={deleteAttendance}>Delete Attendance</Delete>}
                                    </>}                                
                                </div>
                            }
                        </div>
                    }

                
                    {user.admin && !event.hasSignUps && 
                        <div className="padded-event-body">
                            <EventSignUpMenu/>
                        </div>
                    }
                
                    {event.hasSignUps && 
                        <div className={`show-sign-ups-container ${showSignUps ? "sign-ups-shown" : "sign-ups-hidden"}`}>
                            <div className={`toggle-show-sign-ups ${showSignUps ? "sign-ups-shown-btn" : "sign-ups-hidden-btn"}`} onClick={() => setShowSignUps(!showSignUps)}>{showSignUps ? "Hide" : "Show"} Sign Ups</div>
                            {showSignUps &&
                                <div className="show-sign-ups-body">
                                    <div className="separating-line sign-ups-separator"></div>
                                    <EventSignUpTable/>    
                                    {user.admin && <Delete className="btn delete-sign-ups" deleteText="Delete Sign Ups?" onDelete={deleteSignUps}>Delete Sign Ups</Delete>  }                        
                                </div>
                            }
                        </div>
                    }
                    
                
                        
                            
                </>
            )}
            {user.admin && 
                <div className="event-btn-group padded-event-body">
                    <EditEvent/>
                    <Delete deleteText="Are you sure you want to delete this event?" className="btn delete-event-btn" onDelete={onDelete}>Delete</Delete>
                </div>
            }
            
            
        </div>
    )
    
}

export default Event;