import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addAttendance, getAttendance, getStudents } from "../helpers/backendHelpers";

export const Attendance = () => {

    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [attendance, setAttendace] = useState([])

    const onNameChange = e => {
        setName(e.target.value)
    }

    const onDateChange = e => {
        setDate(e.target.value)
    }

    const addEvent = async () => {

        const students = await getStudents()
        const attendees = students.map(student => {
            return {
                firstName: student.firstName,
                lastName: student.lastName,
                grade: student.grade,
                attended: false
            }
        })

        const newEvent = {
            date: date,
            name: name,
            attendees: attendees
        }

        await addAttendance(name, date)
        setAttendace(attendance => [...attendance, newEvent])

        setName("")
        setDate("")
    }

    const attendanceInit = async () => {
        const attendance = await getAttendance()
        setAttendace(attendance)
    }

    const onAttendanceClick = id => {
        const button = document.getElementById(id)
        button.style.backgroundColor = "green"
    }

    useEffect(() => {
        attendanceInit()
    }, [])

    return (
        <div>
            <h1>Attendance</h1>
            <Link to="/">Back to Home</Link>

            <h2>Attendance Table</h2>

            <div id="attendance-list">
                {attendance.map((event, index) => {
                    return (
                        <div key={index} className="event">
                            <h2>{event.name}</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Present</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event.attendees.map((student, index) => {

                                        const id = student.firstName + student.lastName + student.grade

                                        return (
                                            <tr key={index}>
                                                <td>{student.firstName + " " + student.lastName}</td>
                                                <td><button id={id} className={student.attended ? "present" : "not-present"} onClick={onAttendanceClick(id.toString())}>present</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>

            <h2>Add Event</h2>
            <input type="text" value={name} onChange={onNameChange}/>
            <input type="date" value={date} onChange={onDateChange}/>
            <button onClick={addEvent}>Add Event</button>
        </div>
    )

}

export default Attendance;