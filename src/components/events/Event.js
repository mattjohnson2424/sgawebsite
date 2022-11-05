import React, { useContext, useState, useEffect } from "react"
import AttendanceTable from "./AttendanceTable"
import Delete from "../general/Delete"
import { doc, deleteDoc, updateDoc, query, collection, onSnapshot } from "@firebase/firestore"
import { db } from "../../firebase"
import EventContext from "../../contexts/EventContext"
import UserContext from "../../contexts/UserContext"

export const Event = () => {

    const [showAttendance, setShowAttendance] = useState(false)
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

    const pullNewUsers = async () => {
        const keys = Object.keys(event.attendance)
        const q = query(collection(db, "users"));
        await onSnapshot(q, async querySnapshot => {
            const users = [];
            querySnapshot.forEach(user => {
                users.push({
                    id: user.id,
                    ...user.data(),
                });
            });
            
            users.filter(
                user => !keys.includes(user.id)
            ).forEach(async user => {
                await updateDoc(doc(db, 'events', event.id), {
                    [`attendance.${user.id}`]: {
                        ...user,
                        present: false
                    }
                })
            });
        })
    }

    useEffect(() => {

        const dbFreshmen = []
        const dbSophomores = []
        const dbJuniors = []
        const dbSeniors = []

        const keys = Object.keys(event.attendance)
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
            <p>Posted on {event.date} by {event.postedBy}</p>

            {(user.admin || user.officer) && (
                <>
                {user.admin && <Delete onDelete={onDelete} collection="events" id={event.id}>Delete</Delete>}
                {user.officer && event.takeAttendance ? showAttendance ? 
                    <>
                        <button onClick={e => setShowAttendance(false)}>Hide Attendance</button>
                        <button onClick={pullNewUsers}>Pull New Users</button>
                        {user.admin && <Delete onDelete={deleteAttendance}>Delete Attendance</Delete>}
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
            </>
            )}
            
            
        </div>
    )
    
}

export default Event;