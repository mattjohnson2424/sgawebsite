import { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import "./AttendanceInfo.css"

export const AttendanceInfo = ({ events, eventType }) => {

    const user = useContext(UserContext)

    return (
        <>
            {events.filter(event => event.takeAttendance).filter(event => event.eventType === eventType).length === 0 ? <p style={{ textAlign: "center", fontSize: "1.5rem", paddingBottom: "50px" }}>No Attendance has been taken for this category</p> :
                <div className="my-attendance-table">
                    <div className="my-attendance-table-heading">
                        <h3 className="my-attendance-table-item">Event</h3>
                        <h3 className="my-attendance-table-item">Date</h3>
                        <h3 className="my-attendance-table-item">Present</h3>
                    </div>
                    <div className="my-attendance-table-body">
                        {events.sort((a,b) => new Date(b.date) - new Date(a.date)).filter(event => event.takeAttendance).filter(event => event.eventType === eventType).map((event, index) => {
                            const field = `attendance.${user.uid}.present`
                            return (
                                <div key={index} className="my-attendance-table-row">
                                    <div className="my-attendance-table-item">{event.name}</div>
                                    <div className="my-attendance-table-item">{event.formattedDate}</div>
                                    <div className={`my-attendance-table-item my-table-present-info ${event[field] ? "my-attendance-present" : "my-attendance-not-present"}`}>{event[field] ? <span>&#10004;</span> : <span>&#10006;</span>}</div>
                                </div>
                            )   
                        })}
                    </div>
                </div>
            }
        </>
    )
}

export default AttendanceInfo