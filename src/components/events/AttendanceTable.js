import React, { useState } from "react"
import TableRow from "./TableRow"

export const AttendanceTable = props => {

    const [filter, setFilter] = useState("")

    return (
        <div>  
            <h3>{props.title}</h3>
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
                    {props.users.filter(user => {
                        const filterEmpty = filter === "";
                        const containsString = (user.firstName + user.lastName).toLowerCase().includes(filter.toLowerCase())
                        return filterEmpty || containsString;
                    }).sort((a,b) => {
                        if ((a.lastName + a.firstName).toLowerCase() > (b.lastName + b.firstName).toLowerCase()) {
                            return 1
                        } else if ((b.lastName + b.firstName).toLowerCase() > (a.lastName + a.firstName).toLowerCase()) {
                            return -1
                        } else {
                            return 0
                        }
                    }).map((user, index) => {
                        return (
                            <TableRow key={index} user={user}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AttendanceTable;