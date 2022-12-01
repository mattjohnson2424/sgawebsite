import React, { useState, useEffect } from "react"
import AttendanceTable from "./AttendanceTable"
import "./AttendanceTableGroup.css"

export const AttendanceTableGroup = ({ event }) => {

    const [freshmen, setFreshmen] = useState([])
    const [sophomores, setSophomores] = useState([])
    const [juniors, setJuniors] = useState([])
    const [seniors, setSeniors] = useState([])
    const [staff, setStaff] = useState([])

    useEffect(() => {

        const dbFreshmen = []
        const dbSophomores = []
        const dbJuniors = []
        const dbSeniors = []
        const dbStaff = []

        const attendance = event.attendance

        const keys = Object.keys(Object(attendance))
        keys.forEach(key => {
            if (event.attendance[key].grade === '9') {
                dbFreshmen.push({
                    id: key,
                    ...event.attendance[key]
                })
            } else if (event.attendance[key].grade === '10') {
                dbSophomores.push({
                    id: key,
                    ...event.attendance[key]
                })
            } else if (event.attendance[key].grade === '11') {
                dbJuniors.push({
                    id: key,
                    ...event.attendance[key]
                })
            } else if (event.attendance[key].grade === '12') {
                dbSeniors.push({
                    id: key,
                    ...event.attendance[key]
                })
            } else if (event.attendance[key].grade === 'staff') {
                dbStaff.push({
                    id: key,
                    ...event.attendance[key]
                })
            }
        })

        setFreshmen(dbFreshmen)
        setSophomores(dbSophomores)
        setJuniors(dbJuniors)
        setSeniors(dbSeniors)
        setStaff(dbStaff)

    }, [event])

    return (
        <div className="attendance-table-group">
            <AttendanceTable event={event} title={'Freshmen'} users={freshmen}/>
            <AttendanceTable event={event} title={'Sophomores'} users={sophomores}/>
            <AttendanceTable event={event} title={'Juniors'} users={juniors}/>
            <AttendanceTable event={event} title={'Seniors'} users={seniors}/>
            <AttendanceTable event={event} title={'Staff'} users={staff}/>
        </div>
    )
}

export default AttendanceTableGroup