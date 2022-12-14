import { useContext, useEffect, useState } from "react"
import UserContext from "../../contexts/UserContext"

export const SchoolwideEventsStatus = ({ events }) => {

    const [totalSchoolwideEvents, setTotalSchoolwideEvents] = useState(0)
    const [schoolwideEventsAttended, setSchoolwideEventsAttended] = useState(0)
    const user = useContext(UserContext)

    useEffect(() => {
        setTotalSchoolwideEvents(events.filter(event => event.eventType === "schoolwide" && event.takeAttendance).length)
        let attended = 0
        events.filter(event => event.eventType === "schoolwide" && event.takeAttendance).forEach(event => {
            if (event.attendance[user.uid].present) {
                attended++
            }
        })
        setSchoolwideEventsAttended(attended)
    }, [events, user.uid])

    return (
        <>
        {totalSchoolwideEvents !== 0 &&         
            <p className="attendance-info-text">You have attended {schoolwideEventsAttended}/{totalSchoolwideEvents} schoolwide events</p>
        }
        </>
    )
}

export default SchoolwideEventsStatus