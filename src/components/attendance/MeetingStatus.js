import { useContext, useEffect, useState } from "react"
import UserContext from "../../contexts/UserContext"

export const MeetingStatus = ({ events }) => {

    const [totalMeetings, setTotalMeetings] = useState(0)
    const [meetingsAttended, setMeetingsAttended] = useState(0)
    const user = useContext(UserContext)

    useEffect(() => {
        setTotalMeetings(events.filter(event => event.eventType === "meeting" && event.takeAttendance).length)
        let attended = 0
        events.filter(event => event.eventType === "meeting" && event.takeAttendance).forEach(event => {
            if (event.attendance[user.uid].present) {
                attended++
            }
        })
        setMeetingsAttended(attended)
    }, [events, user.uid])

    return (
        <>
            {totalMeetings !== 0 && 
                <p className="attendance-info-text">
                    You have attended {meetingsAttended}/{totalMeetings} Meetings. {totalMeetings - meetingsAttended < 2 && `You can miss ${meetingsAttended - totalMeetings + 2} more meeting(s)`}{totalMeetings - meetingsAttended === 2 && "You cannot miss any more meetings!"}{totalMeetings - meetingsAttended > 2 && "You have missed more than two meetings, your administrator will speak to you soon!"}
                </p>  
            }
        </>
    )
}

export default MeetingStatus