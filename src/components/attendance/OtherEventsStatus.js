import { useContext, useEffect, useState } from "react"
import UserContext from "../../contexts/UserContext"

export const OtherEventsStatus = ({ events }) => {

    const [totalOtherEvents, setTotalOtherEvents] = useState(0)
    const [otherEventsAttended, setOtherEventsAttended] = useState(0)
    const user = useContext(UserContext)

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
        <>
        {totalOtherEvents !== 0 &&
            <p className="attendance-info-text">You have attended {otherEventsAttended}/{totalOtherEvents} miscellaneous events</p>
        }
        </>
    )
}

export default OtherEventsStatus