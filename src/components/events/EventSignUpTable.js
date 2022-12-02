import { useEffect, useState, memo } from "react"
import { compareProps } from "../../helpers/memoHelpers"
import "./EventSignUpTable.css"

export const EventSignUpTable = memo(({ signUps }) => {

    const [nameFilter, setNameFilter] = useState("")
    const [gradeFilter, setGradeFilter] = useState("")
    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(Object.keys(signUps).map(key => {
            return signUps[key]
        }))
    }, [signUps])

    return (
        <>
            {users.length === 0 ? <p style={{ textAlign: "center", fontSize: "1.5rem", paddingBottom: "50px" }}>No users have signed up yet</p> : <>
        
                <div className="sign-up-filter-container">
                    <div className="input-group">
                        <input required className="sign-up-name-filter-input" id="sign-up-name-filter" type="text" value={nameFilter} onChange={e => setNameFilter(e.target.value)}/>
                        <span className="bar sign-up-name-filter-bar"></span>
                        <label className="sign-up-name-filter-label" htmlFor="sign-up-name-filter">Filter Name</label>
                    </div>
                    <div className="sign-up-select-grade">
                        <div className="sign-up-select-grade-option" id={`${gradeFilter === "9" && "sign-up-grade-selected"}`} onClick={() => {gradeFilter === "9" ? setGradeFilter("") : setGradeFilter("9")}}>Grade 9</div>
                        <div className="sign-up-select-grade-option" id={`${gradeFilter === "10" && "sign-up-grade-selected"}`} onClick={() => {gradeFilter === "10" ? setGradeFilter("") : setGradeFilter("10")}}>Grade 10</div>
                        <div className="sign-up-select-grade-option" id={`${gradeFilter === "11" && "sign-up-grade-selected"}`} onClick={() => {gradeFilter === "11" ? setGradeFilter("") : setGradeFilter("11")}}>Grade 11</div>
                        <div className="sign-up-select-grade-option" id={`${gradeFilter === "12" && "sign-up-grade-selected"}`} onClick={() => {gradeFilter === "12" ? setGradeFilter("") : setGradeFilter("12")}}>Grade 12</div>
                        <div className="sign-up-select-grade-option" id={`${gradeFilter === "staff" && "sign-up-grade-selected"}`} onClick={() => {gradeFilter === "staff" ? setGradeFilter("") : setGradeFilter("staff")}}>Staff</div>
                    </div>
                </div>
                
                <div className="sign-up-table">
                    <div className="sign-up-table-head">
                        <h3 style={{ textAlign: "center"}}>Name</h3>
                        <h3 style={{ textAlign: "center"}}>Grade</h3>
                    </div>
                    <div className="sign-up-table-body">
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
                                <div className="sign-up-row" key={index}>
                                    <p style={{ textAlign: "center" }}>{`${user.firstName} ${user.lastName}`}</p>
                                    <p style={{ textAlign: "center" }}>{`${user.grade}`}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>}
        </>
    )
}, compareProps)

export default EventSignUpTable