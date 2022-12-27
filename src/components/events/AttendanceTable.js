import React, { useState, memo } from "react"
import TableRow from "./TableRow"
import "./AttendanceTable.css"
import { objectsEqual } from "../../helpers/memoHelpers"

export const AttendanceTable = memo(({ id, title, users }) => {

    const [filter, setFilter] = useState("")

    return (
        <>
            {users.length === 0 ? 
            <div className="table-filter">
                <h3 className="attendance-table-grade-title">{title}</h3>
                <p style={{ textAlign: "center" }}>No users are in this category</p> 
            </div>: 
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

                                let aGrade;
                                let bGrade;

                                if (a.grade === "staff") {
                                    aGrade = 13
                                } else {
                                    aGrade = parseInt(a.grade)
                                }
                                if (b.grade === "staff") {
                                    bGrade = 13
                                } else {
                                    bGrade = parseInt(b.grade)
                                }

                                if(aGrade < bGrade) {
                                    return -1
                                } else if (aGrade > bGrade) {
                                    return 1
                                } else {
                                    if ((a.firstName + a.lastName).toLowerCase() > (b.firstName + b.lastName).toLowerCase()) {
                                        return 1
                                    } else if ((b.firstName + b.lastName).toLowerCase() > (a.firstName + a.lastName).toLowerCase()) {
                                        return -1
                                    } else {
                                        return 0
                                    }
                                }

                            }).map((user) => {
                                return (
                                    <TableRow id={id} key={user.id} user={user}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}, (prevProps, nextProps) => {

    if(nextProps.users.length === 0) {
        return true
    }
    if (!(objectsEqual(prevProps.users, nextProps.users) && prevProps.id === nextProps.id && prevProps.title === nextProps.title)) {
        return false // causes rerender
    }
    return true
})

export default AttendanceTable;