import React, { useState, useEffect } from "react"
import TableRow from "./TableRow"

export const AttendanceTable = props => {

    const [attendance, setAttendance] = useState(props.event.attendance)
    const [filter, setFilter] = useState("")

    useEffect(() => {
        setAttendance(props.event.attendance)
    }, [props])

    return (
        <>
            <label htmlFor="filter">Filter Name: </label>
            <input id="filter" type="text" value={filter} onChange={e => setFilter(e.target.value)}/>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Present</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.filter(user => {
                        const filterEmpty = filter === "";
                        const containsString = (user.firstName + user.lastName).toLowerCase().includes(filter.toLowerCase())
                        return filterEmpty || containsString;
                    }).map((user, index) => {
                        return (
                            <TableRow key={index} user={user}/>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default AttendanceTable;