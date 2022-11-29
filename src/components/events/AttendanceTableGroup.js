import React, { useState, useEffect, useContext } from "react"
import EventContext from "../../contexts/EventContext"
import AttendanceTable from "./AttendanceTable"
import "./AttendanceTableGroup.css"

export const AttendanceTableGroup = () => {

    const [freshmen, setFreshmen] = useState([])
    const [sophomores, setSophomores] = useState([])
    const [juniors, setJuniors] = useState([])
    const [seniors, setSeniors] = useState([])
    const [staff, setStaff] = useState([])

    const event = useContext(EventContext)

    useEffect(() => {

        const dbFreshmen = []
        const dbSophomores = []
        const dbJuniors = []
        const dbSeniors = []
        const dbStaff = []

        const attendance = event.attendance

        const keys = Object.keys(Object(attendance))
        keys.map(key => {
            return {
                id: key,
                ...event.attendance[key]
            }
        }).forEach(user => {
            if (user.grade === '9') {
                dbFreshmen.push(user)
            } else if (user.grade === '10') {
                dbSophomores.push(user)
            } else if (user.grade === '11') {
                dbJuniors.push(user)
            } else if (user.grade === '12') {
                dbSeniors.push(user)
            } else if (user.grade === 'staff') {
                dbStaff.push(user)
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
            <AttendanceTable title={'Freshmen'} users={freshmen}/>
            <AttendanceTable title={'Sophomores'} users={sophomores}/>
            <AttendanceTable title={'Juniors'} users={juniors}/>
            <AttendanceTable title={'Seniors'} users={seniors}/>
            <AttendanceTable title={'Staff'} users={staff}/>
        </div>
    )
}

export default AttendanceTableGroup