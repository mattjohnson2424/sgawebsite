import { useContext, useEffect, useState } from "react"
import { query, collection, onSnapshot } from "@firebase/firestore"
import { db } from "../../firebase"
import UserInfo from "./UserInfo"
import UserContext from "../../contexts/UserContext"
import useWindowDimensions from "../general/useWindowDimensions"
import "./UserDisplay.css"

export const UserDisplay = () => {

    const { width } = useWindowDimensions()
    const [users, setUsers] = useState([])
    const user = useContext(UserContext)
    const [nameFilter, setNameFilter] = useState("")
    const [gradeFilter, setGradeFilter] = useState("")

    useEffect(() => {
        const usersInit = async () => {
            const q = query(collection(db, "users"));
            await onSnapshot(q, (querySnapshot) => {
                const dbUsers = [];
                querySnapshot.forEach(doc => {
                    dbUsers.push({
                        ...doc.data(),
                        id: doc.id
                    })
                })
                setUsers(dbUsers)
            })
        }
        usersInit()
    }, [])

    return (
        <>
            <h2 style={{ textAlign: "center", fontSize: "3rem"}}>User Info</h2>
            <div className="admin-filters">
                <div className="input-group admin-filter-name">
                    <input required type="text" value={nameFilter} onChange={e => setNameFilter(e.target.value)}/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Filter Name</label>
                </div>
                <div className="select-grade">
                    <div className="select-grade-option" id={`${gradeFilter === "9" && "grade-selected"}`} onClick={() => {gradeFilter === "9" ? setGradeFilter("") : setGradeFilter("9")}}>Grade 9</div>
                    <div className="select-grade-option" id={`${gradeFilter === "10" && "grade-selected"}`} onClick={() => {gradeFilter === "10" ? setGradeFilter("") : setGradeFilter("10")}}>Grade 10</div>
                    <div className="select-grade-option" id={`${gradeFilter === "11" && "grade-selected"}`} onClick={() => {gradeFilter === "11" ? setGradeFilter("") : setGradeFilter("11")}}>Grade 11</div>
                    <div className="select-grade-option" id={`${gradeFilter === "12" && "grade-selected"}`} onClick={() => {gradeFilter === "12" ? setGradeFilter("") : setGradeFilter("12")}}>Grade 12</div>
                    <div className="select-grade-option" id={`${gradeFilter === "staff" && "grade-selected"}`} onClick={() => {gradeFilter === "staff" ? setGradeFilter("") : setGradeFilter("staff")}}>Staff</div>
                </div>
            </div>
            <div className={user.owner ? "user-owner-table" : "user-table"}>
                {width >= 1025 && <>
                    <h3 className="table-header">First Name</h3>
                    <h3 className="table-header">Last Name</h3>
                    <h3 className="table-header">Grade</h3>
                    <h3 className="table-header">Rank</h3>
                    <h3 className="table-header">Edit User</h3>
                    {user.owner && <>
                        <h3 className="table-header">Promote</h3>
                        <h3 className="table-header">Demote</h3>
                    </>}
                    <h3 className="table-header">Un-Whitelist</h3>
                </>}
            
                {/* table body */}
                {
                
                users.filter(tableUser => {
                    return tableUser.id !== user.uid && !tableUser.owner
                }).filter(tableUser => {
                    return user.owner || !tableUser.admin
                })
                .filter(tableUser => {
                    return ((tableUser.firstName + tableUser.lastName).toLowerCase().includes(nameFilter) || nameFilter === "") && ((tableUser.grade) === gradeFilter || gradeFilter === "")
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

                })
                .map(user => {
                    return (
                        <UserInfo key={user.id} tableUser={user}/>
                    )
                })}
            </div>
        </>
    )
}

export default UserDisplay