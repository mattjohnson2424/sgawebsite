import "./UserDashboard.css"
import { useState, useEffect, useContext } from "react"
import { query, collection, onSnapshot } from "@firebase/firestore"
import { db } from "../../firebase"
import UserContext from "../../contexts/UserContext"
import dayjs from "dayjs"

export const UserDashboard = () => {

    const user = useContext(UserContext)

    const [events, setEvents] = useState([]);
    const [totalMeetings, setTotalMeetings] = useState(0)
    const [meetingsAttended, setMeetingsAttended] = useState(0)
    const [totalServiceProjects, setTotalServiceProjects] = useState(0)
    const [serviceProjectsAttended, setServiceProjectsAttended] = useState(0)
    const [totalOtherEvents, setTotalOtherEvents] = useState(0)
    const [otherEventsAttended, setOtherEventsAttended] = useState(0)


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

    useEffect(() => {
        eventsInit()

        // Meetings
        setTotalMeetings(events.filter(event => event.eventType === "meeting" && event.takeAttendance).length)
        let attended = 0
        events.filter(event => event.eventType === "meeting" && event.takeAttendance).forEach(event => {
            const field = `attendance.${user.uid}.present`
            if (event[field]) {
                attended++
            }
        })
        setMeetingsAttended(attended)

        // Service Projects
        setTotalServiceProjects(events.filter(event => event.eventType === "service-project" && event.takeAttendance).length)
        attended = 0
        events.filter(event => event.eventType === "service-project" && event.takeAttendance).forEach(event => {
            const field = `attendance.${user.uid}.present`
            if (event[field]) {
                attended++
            }
        })
        setServiceProjectsAttended(attended)

        // Other Events
        setTotalOtherEvents(events.filter(event => event.eventType === "other" && event.takeAttendance).length)
        attended = 0
        events.filter(event => event.eventType === "other" && event.takeAttendance).forEach(event => {
            const field = `attendance.${user.uid}.present`
            if (event[field]) {
                attended++
            }
        })
        setOtherEventsAttended(attended)
    }, [events, user])

    return (
        <div className="user-dashboard">
            <div className="info-box upcoming-events">
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
                            <p className="dashboard-info" key={index}>{event.name} on {dayjs(event.date).format("dddd, MMMM, DD")} at {event.time}</p>
                        )
                    })}
                </> : <p className="dashboard-info">No upcoming events!</p>}
                
            </div>
            <div className="info-box attendance">
                <h2 className="info-title">Attendance</h2>
                <p className="dashboard-info">Attended {meetingsAttended}/{totalMeetings} meetings</p>
                <p className="dashboard-info">Attended {serviceProjectsAttended}/{totalServiceProjects} service projects</p>
                <p className="dashboard-info">Attended {otherEventsAttended}/{totalOtherEvents} miscellaneous events</p>
            </div>
            <div className="info-box sign-ups">
                <h2 className="info-title">Sign Ups</h2>
                {events.filter(event => {
                    return Date.parse(event.date + " " + event.time) > Date.now()
                }).filter(event => event.hasSignUps).length > 0 ? <>
                    {events.filter(event => {
                        return Date.parse(event.date + " " + event.time) > Date.now()
                    }).filter(event => event.hasSignUps).sort((a, b) => {
                        const aDate = Date.parse(a.date + " " + a.time)
                        const bDate = Date.parse(b.date + " " + b.time)
                        return aDate - bDate
                    }).map((event, index) => (
                        <p className="dashboard-info" key={index}>{event.name}</p>
                    ))}
                </> : <p className="dashboard-info">No Sign Ups availible at this time!</p>}
                
            </div>
        </div>
    )
}

export default UserDashboard