import { useContext, useEffect, useState } from "react"
import EventContext from "../../contexts/EventContext"

export const EventSignUpTable = () => {

    const [nameFilter, setNameFilter] = useState("")
    const [gradeFilter, setGradeFilter] = useState("")
    const [users, setUsers] = useState([])
    const event = useContext(EventContext)

    useEffect(() => {
        setUsers(Object.keys(event.signUps).map(key => {
            return event.signUps[key]
        }))
    }, [event.signUps])

    return (
        <>
            <label htmlFor="sign-up-name-filter">Filter Name: </label>
            <input id="sign-up-name-filter" type="text" value={nameFilter} onChange={e => setNameFilter(e.target.value)}/>
            <label htmlFor="sign-up-grade-filter">Grade Filter: </label>
            <select id="sign-up-grade-filter" name="grade-filter" value={gradeFilter} onChange={e => setGradeFilter(e.target.value)}>
                <option value="">All</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {users.filter(user => {
                        return ((user.firstName + user.lastName).toLowerCase().includes(nameFilter) || nameFilter === "") && ((user.grade) === gradeFilter || gradeFilter === "")
                    }).sort((a,b) => {
                        if ((a.firstName.lastName + a.firstName).toLowerCase() > (b.lastName + b.firstName).toLowerCase()) {
                            return 1
                        } else if ((a.lastName + a.firstName).toLowerCase() > (b.lastName + b.firstName).toLowerCase()) {
                            return -1
                        } else {
                            return 0
                        }
                    }).map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{`${user.lastName}, ${user.firstName}`}</td>
                                <td>{`${user.grade}`}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default EventSignUpTable