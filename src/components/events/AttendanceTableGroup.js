import React, { useState, useEffect, memo } from "react"
import { compareProps } from "../../helpers/memoHelpers"
import AttendanceTable from "./AttendanceTable"
import "./AttendanceTableGroup.css"

export const AttendanceTableGroup = memo(({ attendance, id }) => {

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

        const keys = Object.keys(Object(attendance))
        keys.forEach(key => {
            if (attendance[key].grade === '9') {
                dbFreshmen.push({
                    id: key,
                    ...attendance[key]
                })
            } else if (attendance[key].grade === '10') {
                dbSophomores.push({
                    id: key,
                    ...attendance[key]
                })
            } else if (attendance[key].grade === '11') {
                dbJuniors.push({
                    id: key,
                    ...attendance[key]
                })
            } else if (attendance[key].grade === '12') {
                dbSeniors.push({
                    id: key,
                    ...attendance[key]
                })
            } else if (attendance[key].grade === 'staff') {
                dbStaff.push({
                    id: key,
                    ...attendance[key]
                })
            }
        })

        // ! SORT BASED ON ID
        setFreshmen(dbFreshmen.sort((a,b) => {
            if (a.id < b.id) {
                return 1
            } else if (a.id > b.id) {
                return -1
            } else {
                return 0
            }
        }))
        setSophomores(dbSophomores.sort((a,b) => {
            if (a.id < b.id) {
                return 1
            } else if (a.id > b.id) {
                return -1
            } else {
                return 0
            }
        }))
        setJuniors(dbJuniors.sort((a,b) => {
            if (a.id < b.id) {
                return 1
            } else if (a.id > b.id) {
                return -1
            } else {
                return 0
            }
        }))
        setSeniors(dbSeniors.sort((a,b) => {
            if (a.id < b.id) {
                return 1
            } else if (a.id > b.id) {
                return -1
            } else {
                return 0
            }
        }))
        setStaff(dbStaff.sort((a,b) => {
            if (a.id < b.id) {
                return 1
            } else if (a.id > b.id) {
                return -1
            } else {
                return 0
            }
        }))

    }, [attendance])

    return (
        <div className="attendance-table-group">
            <AttendanceTable id={id}   title={'Freshmen'}   users={freshmen}   />
            <AttendanceTable id={id}   title={'Sophomores'} users={sophomores} />
            <AttendanceTable id={id}   title={'Juniors'}    users={juniors}    />
            <AttendanceTable id={id}   title={'Seniors'}    users={seniors}    />
            <AttendanceTable id={id}   title={'Staff'}      users={staff}      />
        </div>
    )
}, compareProps)

export default AttendanceTableGroup