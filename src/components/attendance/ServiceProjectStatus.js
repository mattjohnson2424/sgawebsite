import { useContext, useEffect, useState } from "react"
import UserContext from "../../contexts/UserContext"

export const ServiceProjectStatus = props => {

    const [totalServiceProjects, setTotalServiceProjects] = useState(0)
    const [serviceProjectsAttended, setServiceProjectsAttended] = useState(0)
    const user = useContext(UserContext)

    useEffect(() => {
        setTotalServiceProjects(props.events.filter(event => event.eventType === "service-project" && event.takeAttendance).length)
        let attended = 0
        props.events.filter(event => event.eventType === "service-project" && event.takeAttendance).forEach(event => {
            if (event['attendance'][user.uid]['present']) {
                attended++
            }
        })
        setServiceProjectsAttended(attended)
    }, [props, user.uid])

    return (
        <>
            <p>You have attended {serviceProjectsAttended}/{totalServiceProjects} Service Projects</p>
            {2 - serviceProjectsAttended > 0 ? <p>You only need to attend {2 - serviceProjectsAttended} more service project(s) this semester</p> : <p>You have attended all the service projects required, feel free to attend more!</p>}    
        </>
    )
}

export default ServiceProjectStatus