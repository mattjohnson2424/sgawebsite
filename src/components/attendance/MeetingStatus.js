import { useContext, useEffect, useState } from "react"
import UserContext from "../../contexts/UserContext"
import AttendanceContext from "../../contexts/AttendanceContext"

export const MeetingStatus = () => {

    const [totalMeetings, setTotalMeetings] = useState(0)
    const [meetingsAttended, setMeetingsAttended] = useState(0)
    const user = useContext(UserContext)
    const events = useContext(AttendanceContext)

    useEffect(() => {
        setTotalMeetings(events.filter(event => event.eventType === "meeting" && event.takeAttendance).length)
        let attended = 0
        events.filter(event => event.eventType === "meeting" && event.takeAttendance).forEach(event => {
            const field = `attendance.${user.uid}.present`
            if (event[field]) {
                attended++
            }
        })
        setMeetingsAttended(attended)
    }, [events, user.uid])

    return (
        <p className="attendance-info-text">You have attended {meetingsAttended}/{totalMeetings} Meetings. {totalMeetings - meetingsAttended < 2 && `You can miss ${meetingsAttended - totalMeetings + 2} more meeting(s)`}{totalMeetings - meetingsAttended === 2 && "You cannot miss any more meetings!"}{totalMeetings - meetingsAttended > 2 && "You have missed more than two meetings, your administrator will speak to you soon!"}</p>  
    )
}

export default MeetingStatus