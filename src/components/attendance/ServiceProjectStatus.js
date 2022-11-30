import { useContext, useEffect, useState } from "react"
import AttendanceContext from "../../contexts/AttendanceContext"
import UserContext from "../../contexts/UserContext"

export const ServiceProjectStatus = () => {

    const [totalServiceProjects, setTotalServiceProjects] = useState(0)
    const [serviceProjectsAttended, setServiceProjectsAttended] = useState(0)
    const user = useContext(UserContext)
    const events = useContext(AttendanceContext)

    useEffect(() => {
        setTotalServiceProjects(events.filter(event => event.eventType === "service-project" && event.takeAttendance).length)
        let attended = 0
        events.filter(event => event.eventType === "service-project" && event.takeAttendance).forEach(event => {
            const field = `attendance.${user.uid}.present`
            if (event[field]) {
                attended++
            }
        })
        setServiceProjectsAttended(attended)
    }, [events, user.uid])

    return (
        <p className="attendance-info-text">You have attended {serviceProjectsAttended}/{totalServiceProjects} Service Projects. {2 - serviceProjectsAttended > 0 ? `You only need to attend ${2 - serviceProjectsAttended} more service project(s) this semester.` : "You have attended all the service projects required, feel free to attend more!"}</p>
    )
}

export default ServiceProjectStatus