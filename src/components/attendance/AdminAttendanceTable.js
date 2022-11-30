import { useContext, useEffect, useState } from "react"
import AttendanceContext from "../../contexts/AttendanceContext"
import "./AdminAttendanceTable.css"

export const AdminAttendanceTable = props => {

    const [gradeFilter, setGradeFilter] = useState("")
    const [nameFilter, setNameFilter] = useState("")
    const [events, setEvents] = useState([])
    const [eventCount, setEventCount] = useState(0)
    const [flaggedFilter, setFlaggedFilter] = useState(false)
    const [namesExpanded, setNamesExpanded] = useState(false)
    const allEvents = useContext(AttendanceContext)

    useEffect(() => {
        setEvents(allEvents.filter(event => event.eventType === props.eventType && event.takeAttendance))
        setEventCount(allEvents.filter(event => event.eventType === props.eventType && event.takeAttendance).length)
    }, [props, allEvents])

    return (
        <>  
            {eventCount === 0 ? <p style={{ textAlign: "center", fontSize: "1.5rem", paddingBottom: "50px" }}>No Attendance has been taken for this category</p> : <>
            
                <div className="attendance-filters">
                    <div className="input-group">
                        <input required id="name-filter" type="text" value={nameFilter} onChange={e => setNameFilter(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="name-filter">Name Filter</label>
                    </div>
                    <div className="select-grade">
                        <div className="select-grade-option" id={`${gradeFilter === "9" && "grade-selected"}`} onClick={() => {gradeFilter === "9" ? setGradeFilter("") : setGradeFilter("9")}}>Grade 9</div>
                        <div className="select-grade-option" id={`${gradeFilter === "10" && "grade-selected"}`} onClick={() => {gradeFilter === "10" ? setGradeFilter("") : setGradeFilter("10")}}>Grade 10</div>
                        <div className="select-grade-option" id={`${gradeFilter === "11" && "grade-selected"}`} onClick={() => {gradeFilter === "11" ? setGradeFilter("") : setGradeFilter("11")}}>Grade 11</div>
                        <div className="select-grade-option" id={`${gradeFilter === "12" && "grade-selected"}`} onClick={() => {gradeFilter === "12" ? setGradeFilter("") : setGradeFilter("12")}}>Grade 12</div>
                        <div className="select-grade-option" id={`${gradeFilter === "staff" && "grade-selected"}`} onClick={() => {gradeFilter === "staff" ? setGradeFilter("") : setGradeFilter("staff")}}>Staff</div>
                    </div>
                    <button className="btn show-flagged-users" onClick={() => setFlaggedFilter(!flaggedFilter)}>Show {flaggedFilter ? "All Users" : "Flagged Users"}</button>
                    <button className="btn expand-event-names" onClick={() => setNamesExpanded(!namesExpanded)}>{namesExpanded ? "Contract" : "Expand"} Event Names</button>
                </div>

                
                <div className="attendance-table-container">
                    <div className="attendance-table">
                        <div className="attendance-table-header" style={eventCount === 0 ? { gridTemplateColumns: '100px 100px 70px'} : { gridTemplateColumns: `100px 100px 70px repeat(${eventCount}, 60px)`}}>
                            <h3 className="attendance-table-heading first-name">First Name</h3>
                            <h3 className="attendance-table-heading">Last Name</h3>
                            <h3 className="attendance-table-heading">Grade</h3>
                            {events.map((event, index) => <h3 className={`attendance-table-event-name-${namesExpanded ? "expanded" : "contracted"}`} key={index}>{event.name}</h3>)}
                        </div>
                        <>
                            {props.users.filter(user => {
                                if (flaggedFilter) {
                                    let flagged = false;
                                    switch (props.eventType) {
                                        case "meeting":
                                            let meetingsAttended = 0
                                            events.forEach(event => {
                                                if (event.attendance[user.id].present) {
                                                    meetingsAttended++
                                                }
                                            })
                                            flagged = eventCount - meetingsAttended > 2
                                            break;
                                        case "service-project":
                                            let serviceProjectsAttended = 0
                                            props.events.forEach(event => {
                                                if (event.attendance[user.id].present) {
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
                            }).map((user, index) => (
                                <div key={index} className="attendance-table-row" style={eventCount === 0 ? { gridTemplateColumns: '100px 100px 70px', height: "60px"} : { gridTemplateColumns: `100px 100px 70px repeat(${eventCount}, 60px)`}}>
                                    <div className="attendance-table-item first-name">{user.firstName}</div>
                                    <div className="attendance-table-item">{user.lastName}</div>
                                    <div className="attendance-table-item">{user.grade === "staff" ? "Staff" : user.grade}</div>
                                    {events.map((event, index) => {

                                        const present = event.attendance[user.id].present

                                        return (
                                            <div key={index} className={`attendance-table-item present-info ${present ? "attendance-present" : "attendance-not-present"}`}>{present ? <span>&#10004;</span> : <span>&#10006;</span>}</div>
                                        )
                                    })}
                                </div>    
                            ))}
                        </>
                    </div>
                </div>
            </>}
        </>
    )
}

export default AdminAttendanceTable