import "./UserDashboard.css"
import { useState, useEffect, useContext } from "react"
import { query, collection, onSnapshot } from "@firebase/firestore"
import { db } from "../../firebase"
import UserContext from "../../contexts/UserContext"

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
            <div className="info-box-container">
                <div className="info-box dashboard-left">
                    <h2 className="info-title">Upcoming Events</h2>
                    {events.filter(event => {
                        return Date.parse(event.date + " " + event.time) > Date.now()
                    }).sort((a, b) => {
                        const aDate = Date.parse(a.date + " " + a.time)
                        const bDate = Date.parse(b.date + " " + b.time)
                        return aDate - bDate
                    }).map((event, index) => {
                        return (
                            <p key={index}>{event.name} on {event.date} at {event.time}</p>
                        )
                    })}
                </div>
                <div className="dashboard-right">
                    <div className="info-box dashboard-top-right">
                        <h2 className="info-title">Attendance</h2>
                        <p>Attended {meetingsAttended}/{totalMeetings} meetings</p>
                        <p>Attended {serviceProjectsAttended}/{totalServiceProjects} service projects</p>
                        <p>Attended {otherEventsAttended}/{totalOtherEvents} miscellaneous events</p>
                    </div>
                    <div className="info-box dashboard-bottom-right">
                        <h2 className="info-title">Sign Ups</h2>
                        {events.filter(event => event.hasSignUps).sort((a, b) => {
                            const aDate = Date.parse(a.date + " " + a.time)
                            const bDate = Date.parse(b.date + " " + b.time)
                            return aDate - bDate
                        }).map((event, index) => (
                            <p key={index}>{event.name}</p>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard