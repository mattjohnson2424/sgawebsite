import React, { useState } from "react"
import TableRow from "./TableRow"
import "./AttendanceTable.css"

export const AttendanceTable = ({ event, title, users})=> {

    const [filter, setFilter] = useState("")

    return (
        <div className="table-filter">  
            <h3 className="attendance-table-grade-title">{title}</h3>
            <div className="input-group">
                <input required className="event-attendance-name-filter-input" id="attendance-filter" type="text" value={filter} onChange={e => setFilter(e.target.value)}/>
                <span className="event-attendance-name-filter-bar"></span>
                <label className="event-attendance-name-filter-label" htmlFor="attendance-filter">Filter Name</label>
            </div>

            <div className="event-attendance-table">

                <div className="event-attendance-table-heading">
                    <h3 className="event-attendance-table-item">Name</h3>
                    <h3 className="event-attendance-table-item">Present</h3>
                </div>
                <div className="event-attendance-table-body">
                    {users.filter(user => {
                        const filterEmpty = filter === "";
                        const containsString = (user.firstName + user.lastName).toLowerCase().includes(filter.toLowerCase())
                        return filterEmpty || containsString;
                    }).sort((a,b) => {
                        if ((a.firstName + a.lastName).toLowerCase() > (b.firstName + b.lastName).toLowerCase()) {
                            return 1
                        } else if ((b.firstName + b.lastName).toLowerCase() > (a.firstName + a.lastName).toLowerCase()) {
                            return -1
                        } else {
                            return 0
                        }
                    }).map((user, index) => {
                        return (
                            <TableRow event={event} key={index} user={user}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AttendanceTable;