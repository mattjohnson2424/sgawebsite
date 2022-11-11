import { useContext, useEffect, useState } from "react"
import EventContext from "../../contexts/EventContext"

export const AdminAttendanceTable = props => {

    const [gradeFilter, setGradeFilter] = useState("")
    const [nameFilter, setNameFilter] = useState("")
    const [events, setEvents] = useState([])
    const [eventCount, setEventCount] = useState(0)
    const [flaggedFilter, setFlaggedFilter] = useState(false)
    const allEvents = useContext(EventContext)

    useEffect(() => {
        setEvents(allEvents.filter(event => event.eventType === props.eventType))
        setEventCount(allEvents.filter(event => event.eventType === props.eventType).length)
    }, [props, allEvents])

    return (
        <>
            <br/>
            {flaggedFilter ? <button onClick={e => setFlaggedFilter(false)}>All Users</button> : <button onClick={e => setFlaggedFilter(true)}>Show Flagged Users</button>}

            <label htmlFor="name-filter">Name Filter: </label>
            <input id="name-filter" type="text" value={nameFilter} onChange={e => setNameFilter(e.target.value)}/>

            <label htmlFor="grade-filter">Grade Filter: </label>
            <select value={gradeFilter} id="grade-filter" name="grade-filter" onChange={e => setGradeFilter(e.target.value)}>
                <option value="">All</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Grade</th>
                        <th>Flagged</th>
                        {events.map((event, index) => <th key={index}>{event.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {props.users.filter(user => {
                        if (flaggedFilter) {
                            let flagged = false;
                            switch (props.eventType) {
                                case "meeting":
                                    let meetingsAttended = 0
                                    events.forEach(event => {
                                        if (event['attendance'][user.id]['present']) {
                                            meetingsAttended++
                                        }
                                    })
                                    flagged = eventCount - meetingsAttended > 2
                                    break;
                                case "service-project":
                                    let serviceProjectsAttended = 0
                                    props.events.forEach(event => {
                                        if (event['attendance'][user.id]['present']) {
                                            serviceProjectsAttended++
                                        }
                                    })
                                    flagged = (eventCount >= 2) && 2 - serviceProjectsAttended > 0
                                    break;
                            
                                default:
                                    break;
                            }
                            return flagged
                        }
                        return true
                        
                    }).filter(user => {
                        return ((user.firstName + user.lastName).toLowerCase().includes(nameFilter) || nameFilter === "") && ((user.grade) === gradeFilter || gradeFilter === "")
                    }).map((user, index) => {

                        let flagged = false;
                        switch (props.eventType) {
                            case "meeting":
                                let meetingsAttended = 0
                                events.forEach(event => {
                                    if (event['attendance'][user.id]['present']) {
                                        meetingsAttended++
                                    }
                                })
                                flagged = eventCount - meetingsAttended > 2
                                break;
                            case "service-project":
                                let serviceProjectsAttended = 0
                                events.forEach(event => {
                                    if (event['attendance'][user.id]['present']) {
                                        serviceProjectsAttended++
                                    }
                                })
                                flagged = (eventCount >= 2) && 2 - serviceProjectsAttended > 0
                                break;
                        
                            default:
                                break;
                        }



                        return (
                            <tr key={index}>
                                <td>{user.firstName}, {user.lastName}</td>
                                <td>{user.grade}</td>
                                <td className={flagged ? "bad" : "good"}>{flagged ? "BAD" : "GOOD"}</td>
                                {events.map((event, index) => {

                                    const present = event['attendance'][user.id]['present']

                                    return (
                                        <td key={index} className={present ? "present" : "not-present"}>{present ? "HERE" : "not"}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default AdminAttendanceTable