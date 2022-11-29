import { useContext, useState } from "react"
import Modal from "../general/Modal"
import { updateDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase"
import { httpsCallable } from "@firebase/functions"
import { functions } from "../../firebase"
import "./EditUser.css"
import AdminContext from "../../contexts/AdminContext"

export const EditUser = ({ tableUser }) => {

    const [show, setShow] = useState(false)

    const [email, setEmail] = useState(tableUser.email)
    const [firstName, setFirstName] = useState(tableUser.firstName)
    const [lastName, setLastName] = useState(tableUser.lastName)
    const [grade, setGrade] = useState(tableUser.grade)

    const { setShowLoadingScreen } = useContext(AdminContext)

    const onClose = () => {
        setShow(false)
        setEmail(tableUser.email)
        setFirstName(tableUser.firstName)
        setLastName(tableUser.lastName)
        setGrade(tableUser.grade)
    }

    const editUser = async e => {

        e.preventDefault()

        setShowLoadingScreen(true)

        await updateDoc(doc(db, "users", tableUser.id), {
            email: email,
            firstName: firstName,
            lastName: lastName,
            grade: grade
        });

        const updateEmail = httpsCallable(functions, 'updateEmail');
        const result = await updateEmail({ id: tableUser.id, newEmail: email})
        console.log(result)

        setShowLoadingScreen(false)
        setShow(false)
    }

    return (
        <>
            <button className="btn edit-user-btn" onClick={() => setShow(true)}>Edit User</button>
            <Modal show={show} onClose={onClose}>
                <form>
                    <h2>Edit User</h2>
                    <div className="input-group">
                        <input required id="sign-up-email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="sign-up-email">Email</label>
                    </div>
                    <div className="input-group">
                        <input required id="sign-up-first-name" type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="sign-up-first-name">First Name</label>
                    </div>
                    <div className="input-group">
                        <input required id="sign-up-last-name" type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="sign-up-last-name">Last Name</label>
                    </div>
                    <label htmlFor="sign-up-grade">Grade: </label>
                    <div className="select-grade">
                        <div className="select-grade-option" id={`${grade === "9" && "grade-selected"}`} onClick={() => setGrade("9")}>Grade 9</div>
                        <div className="select-grade-option" id={`${grade === "10" && "grade-selected"}`} onClick={() => setGrade("10")}>Grade 10</div>
                        <div className="select-grade-option" id={`${grade === "11" && "grade-selected"}`} onClick={() => setGrade("11")}>Grade 11</div>
                        <div className="select-grade-option" id={`${grade === "12" && "grade-selected"}`} onClick={() => setGrade("12")}>Grade 12</div>
                        <div className="select-grade-option" id={`${grade === "staff" && "grade-selected"}`} onClick={() => setGrade("staff")}>Staff</div>
                    </div>
                    <button className="btn submit-edit-user" type="submit" onClick={editUser}>Edit User</button>
                </form>
            </Modal>
        </>
    )
}