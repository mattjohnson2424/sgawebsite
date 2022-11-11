import { useContext, useEffect, useState } from "react"
import UserContext from "../../contexts/UserContext"
import EventContext from "../../contexts/EventContext"

export const MeetingStatus = () => {

    const [totalMeetings, setTotalMeetings] = useState(0)
    const [meetingsAttended, setMeetingsAttended] = useState(0)
    const user = useContext(UserContext)
    const events = useContext(EventContext)

    useEffect(() => {
        setTotalMeetings(events.filter(event => event.eventType === "meeting" && event.takeAttendance).length)
        let attended = 0
        events.filter(event => event.eventType === "meeting" && event.takeAttendance).forEach(event => {
            if (event['attendance'][user.uid]['present']) {
                attended++
            }
        })
        setMeetingsAttended(attended)
    }, [events, user.uid])

    return (
        <>
            <p>You have attended {meetingsAttended}/{totalMeetings} Meetings</p>
            {totalMeetings - meetingsAttended < 2 && <p>`You can miss {meetingsAttended - totalMeetings + 2} more meeting(s)</p>}
            {totalMeetings - meetingsAttended === 2 && <p>You cannot miss any more meetings!</p>}
            {totalMeetings - meetingsAttended > 2 && <p>You have missed more than two meetings, your administrator will speak to you soon!</p>}            
        </>
    )
}

export default MeetingStatus