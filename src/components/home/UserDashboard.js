import "./UserDashboard.css"
import { useState, useEffect, useContext } from "react"
import { query, collection, onSnapshot, deleteField, doc, updateDoc, getDoc } from "@firebase/firestore"
import { db } from "../../firebase"
import UserContext from "../../contexts/UserContext"
import { Link } from "react-router-dom"
import MeetingStatus from "../attendance/MeetingStatus"
import ServiceProjectStatus from "../attendance/ServiceProjectStatus"
import SchoolwideEventsStatus from "../attendance/SchoolwideEventsStatus"
import OtherEventsStatus from "../attendance/OtherEventsStatus"

export const UserDashboard = () => {

    const user = useContext(UserContext)

    const [events, setEvents] = useState([]);

    const eventsInit = async () => {
        const q = query(collection(db, "events"));
        await onSnapshot(q, (querySnapshot) => {
            const dbEvents = [];
            querySnapshot.forEach(doc => {
                dbEvents.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setEvents(dbEvents)
        })
    }

    const signUp = async event => {
        if (Object.keys(event.signUps).length < event.maxSignUps || event.maxSignUps === null) {
            const docSnap = await getDoc(doc(db, "users", user.uid))
            await updateDoc(doc(db, 'events', event.id), {
                [`signUps.${user.uid}`]: {
                    ...docSnap.data()
                }
            })
        }
    }

    const unSignUp = async event => {
        await updateDoc(doc(db, 'events', event.id), {
            [`signUps.${user.uid}`]: deleteField()
        });
    }

    useEffect(() => {
        eventsInit()
    }, [])

    return (
        <div className="user-dashboard">
             
                <div className="info-box upcoming-events">
                    <Link to="/events">
                        <h2 className="info-title">Upcoming Events</h2>
                        {events.filter(event => {
                            return Date.parse(event.date + " " + event.time) > Date.now()
                        }).length > 0 ? <>
                            {events.filter(event => {
                                return Date.parse(event.date + " " + event.time) > Date.now()
                            }).sort((a, b) => {
                                const aDate = Date.parse(a.date + " " + a.time)
                                const bDate = Date.parse(b.date + " " + b.time)
                                return aDate - bDate
                            }).map((event, index) => {
                                return (
                                    <div key={index} className="individual-event-link dashboard-info">{event.name} on {event.formattedDate}</div>
                                )
                            })}
                        </> : <p style={{ textAlign: "center" }} className="dashboard-info">No upcoming events!</p>}
                    </Link>
                </div>
                
            <div className="info-box attendance">
                <Link to="/attendance">
                    <h2 className="info-title">Attendance</h2>
                    <MeetingStatus events={events}/>
                    <ServiceProjectStatus events={events}/>
                    <SchoolwideEventsStatus events={events}/>
                    <OtherEventsStatus events={events}/>
                </Link>
            </div>
            <div className="info-box sign-ups">
                <h2 className="info-title">Sign Ups</h2>
                {events.filter(event => {
                    return Date.parse(event.date + " " + event.time) > Date.now()
                }).filter(event => event.hasSignUps).length > 0 ? 
                <>
                    {events.filter(event => {
                        return Date.parse(event.date + " " + event.time) > Date.now()
                    }).filter(event => event.hasSignUps).sort((a, b) => {
                        const aDate = Date.parse(a.date + " " + a.time)
                        const bDate = Date.parse(b.date + " " + b.time)
                        return aDate - bDate
                    }).map((event, index) => (
                        <div key={index} className="user-dashboard-sign-up-container">
                            {((Object.keys(event.signUps).length < event.maxSignUps || !event.hasMaxSignUps) && !Object.keys(event.signUps).includes(user.uid)) && 
                                <>
                                    <p className="user-dashboard-sign-up-text">{event.name} on {event.formattedDate}. {event.maxSignUps !== null && `${Object.keys(event.signUps).length}/${event.maxSignUps} people have signed up`}</p>
                                    <button className="btn user-dashboard-sign-up" onClick={() => signUp(event)}>Sign Up</button>
                                </>            
                            }
                            {Object.keys(event.signUps).includes(user.uid) && 
                                <>
                                    <p className="user-dashboard-sign-up-text">You are signed up for {event.name} on {event.formattedDate}. {event.maxSignUps !== null && `${Object.keys(event.signUps).length}/${event.maxSignUps} people have signed up`}</p>
                                    <button className="btn user-dashboard-design-up" onClick={() => unSignUp(event)}>Cancel Registration</button>
                                </>
                            }
                        </div>
                    ))}
                </> : <p className="dashboard-info">No Sign Ups availible at this time!</p>}
                
            </div>
        </div>
    )
}

export default UserDashboard