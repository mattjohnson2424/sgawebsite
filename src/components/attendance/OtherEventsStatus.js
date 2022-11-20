import { useContext, useEffect, useState } from "react"
import EventContext from "../../contexts/EventContext"
import UserContext from "../../contexts/UserContext"

export const OtherEventsStatus = () => {

    const [totalOtherEvents, setTotalOtherEvents] = useState(0)
    const [otherEventsAttended, setOtherEventsAttended] = useState(0)
    const user = useContext(UserContext)
    const events = useContext(EventContext)

    useEffect(() => {
        setTotalOtherEvents(events.filter(event => event.eventType === "other" && event.takeAttendance).length)
        let attended = 0
        events.filter(event => event.eventType === "other" && event.takeAttendance).forEach(event => {
            const field = `attendance.${user.uid}.present`
            if (event[field]) {
                attended++
            }
        })
        setOtherEventsAttended(attended)
    }, [events, user.uid])

    return (
        <p>You have attended {otherEventsAttended}/{totalOtherEvents} miscellaneous events</p>
    )
}

export default OtherEventsStatus