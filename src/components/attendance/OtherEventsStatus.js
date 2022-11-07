import { useContext, useEffect, useState } from "react"
import UserContext from "../../contexts/UserContext"

export const OtherEventsStatus = props => {

    const [totalOtherEvents, setTotalOtherEvents] = useState(0)
    const [otherEventsAttended, setOtherEventsAttended] = useState(0)
    const user = useContext(UserContext)

    useEffect(() => {
        setTotalOtherEvents(props.events.filter(event => event.eventType === "other" && event.takeAttendance).length)
        let attended = 0
        props.events.filter(event => event.eventType === "other" && event.takeAttendance).forEach(event => {
            if (event['attendance'][user.uid]['present']) {
                attended++
            }
        })
        setOtherEventsAttended(attended)
    }, [props, user.uid])

    return (
        <p>You have attended {otherEventsAttended}/{totalOtherEvents} miscellaneous events</p>
    )
}

export default OtherEventsStatus