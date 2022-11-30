import { useContext, useEffect, useState } from "react"
import AttendanceContext from "../../contexts/AttendanceContext"
import UserContext from "../../contexts/UserContext"

export const SchoolwideEventsStatus = () => {

    const [totalSchoolwideEvents, setTotalSchoolwideEvents] = useState(0)
    const [schoolwideEventsAttended, setSchoolwideEventsAttended] = useState(0)
    const user = useContext(UserContext)
    const events = useContext(AttendanceContext)

    useEffect(() => {
        setTotalSchoolwideEvents(events.filter(event => event.eventType === "schoolwide" && event.takeAttendance).length)
        let attended = 0
        events.filter(event => event.eventType === "schoolwide" && event.takeAttendance).forEach(event => {
            const field = `attendance.${user.uid}.present`
            if (event[field]) {
                attended++
            }
        })
        setSchoolwideEventsAttended(attended)
    }, [events, user.uid])

    return (
        <p className="attendance-info-text">You have attended {schoolwideEventsAttended}/{totalSchoolwideEvents} schoolwide events</p>
    )
}

export default SchoolwideEventsStatus