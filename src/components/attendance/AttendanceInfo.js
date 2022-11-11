import { useContext } from "react"
import EventContext from "../../contexts/EventContext"
import UserContext from "../../contexts/UserContext"

export const AttendanceInfo = props => {

    const user = useContext(UserContext)
    const events = useContext(EventContext)

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Present</th>
                    </tr>
                </thead>
                <tbody>
                    {events.sort((a,b) => new Date(b.date) - new Date(a.date)).filter(event => event.takeAttendance).filter(event => event.eventType === props.eventType).map((event, index) => {
                        return (
                            <tr key={index}>
                                <td>{event.name}</td>
                                <td>{event.date}</td>
                                <td>{event['attendance'][user.uid]['present'] ? "Present" : "Absent"}</td>
                            </tr>
                        )   
                    })}
                </tbody>
            </table>
        </>
    )
}

export default AttendanceInfo