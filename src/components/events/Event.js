import React, { useContext, useState, useEffect } from "react"
import AttendanceTable from "./AttendanceTable"
import Delete from "../general/Delete"
import { doc, deleteDoc, updateDoc, getDoc, deleteField } from "@firebase/firestore"
import { db } from "../../firebase"
import EventContext from "../../contexts/EventContext"
import UserContext from "../../contexts/UserContext"
import EventSignUpMenu from "./EventSignUpMenu"
import EventSignUpTable from "./EventSignUpTable"

export const Event = () => {

    const [showAttendance, setShowAttendance] = useState(false)
    const [showSignUps, setShowSignUps] = useState(false)
    const event = useContext(EventContext)
    const user = useContext(UserContext)

    const [freshmen, setFreshmen] = useState([])
    const [sophomores, setSophomores] = useState([])
    const [juniors, setJuniors] = useState([])
    const [seniors, setSeniors] = useState([])

    const addAttendance = async () => {
        await updateDoc(doc(db, 'events', event.id), {
            takeAttendance: true
        });
        setShowAttendance(true)
    }

    const onDelete = async () => {
        await deleteDoc(doc(db, 'events', event.id));
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

    const signUp = async () => {


        if (Object.keys(event.signUps).length < event.maxSignUps || event.maxSignUps === null) {
            const docSnap = await getDoc(doc(db, "users", user.uid))
            await updateDoc(doc(db, 'events', event.id), {
                [`signUps.${user.uid}`]: {
                    ...docSnap.data()
                }
            })
        }
    }

    const unSignUp = async () => {
        await updateDoc(doc(db, 'events', event.id), {
            [`signUps.${user.uid}`]: deleteField()
        });
    }

    useEffect(() => {

        const dbFreshmen = []
        const dbSophomores = []
        const dbJuniors = []
        const dbSeniors = []

        const attendance = event.attendance

        const keys = Object.keys(Object(attendance))
        keys.map(key => {
            return {
                id: key,
                ...event.attendance[key]
            }
        }).forEach(user => {
            if (user.grade === '9') {
                dbFreshmen.push(user)
            } else if (user.grade === '10') {
                dbSophomores.push(user)
            } else if (user.grade === '11') {
                dbJuniors.push(user)
            } else if (user.grade === '12') {
                dbSeniors.push(user)
            }
        })

        setFreshmen(dbFreshmen)
        setSophomores(dbSophomores)
        setJuniors(dbJuniors)
        setSeniors(dbSeniors)

    }, [event])

    return (
        <div className="event">
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            {event.eventType === "meeting" && <p>Meeting on {event.date} at {event.time}</p>}
            {event.eventType === "service-project" && <p>Service Project on {event.date} at {event.time}</p>}
            {event.eventType === "other" && <p>Other Event on {event.date} at {event.time}</p>}
            {event.hasSignUps && <>
                {((Object.keys(event.signUps).length < event.maxSignUps || event.maxSignUps === null) && !Object.keys(event.signUps).includes(user.uid)) && 
                <>
                    <p>This event has a sign up attached! Click below if you want to sign up</p>
                    <button onClick={signUp}>Sign Up</button>
                </> 
                              
                }
                {Object.keys(event.signUps).includes(user.uid) && 
                <>
                    <p>You are signed up for this event!</p>
                    <button onClick={unSignUp}>De-Signup</button>
                </>}
                {event.maxSignUps !== null && <p>{`${Object.keys(event.signUps).length}/${event.maxSignUps} people signed up`}</p>}
            </>}
            <br/>
            {(user.admin || user.officer) && (
                <>
                {user.admin && <Delete onDelete={onDelete}>Delete Event</Delete>}
                {user.officer && event.takeAttendance ? showAttendance ? 
                    <>
                        <button onClick={e => setShowAttendance(false)}>Hide Attendance</button>
                        
                        <div className="row">
                            <AttendanceTable title={'Freshmen'} users={freshmen}/>
                            <AttendanceTable title={'Sophomores'} users={sophomores}/>
                            <AttendanceTable title={'Juniors'} users={juniors}/>
                            <AttendanceTable title={'Seniors'} users={seniors}/>
                        </div>
                    </> : <button onClick={e => setShowAttendance(true)}>Show Attendance</button>: <>
                        {user.admin && <button onClick={addAttendance}>Add Attendance</button>}
                    </>
                }
                {user.admin && <Delete onDelete={deleteAttendance}>Delete Attendance</Delete>}
                <br/>
                {user.admin && event.hasSignUps ? 
                <>
                    {showSignUps ? <>
                        <EventSignUpTable/>
                        <button onClick={e => setShowSignUps(false)}>Hide Sign Ups</button>
                    </> : <button onClick={e => setShowSignUps(true)}>Show Sign Ups</button>}
                    <Delete onDelete={deleteSignUps}>Delete Sign Ups</Delete>
                </> : <EventSignUpMenu/>}
                
            </>
            )}
            
            
        </div>
    )
    
}

export default Event;