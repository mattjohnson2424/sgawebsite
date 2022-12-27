import { useContext, useState } from "react"
import Modal from "../general/Modal"
import { httpsCallable } from "@firebase/functions"
import { functions } from "../../firebase"
import "./EditUser.css"
import AdminContext from "../../contexts/AdminContext"
import { toE164, isValidE164 } from "../../helpers/phoneHelpers"

export const EditUser = ({ tableUser }) => {

    const [show, setShow] = useState(false)

    const [firstName, setFirstName] = useState(tableUser.firstName)
    const [lastName, setLastName] = useState(tableUser.lastName)
    const [phone, setPhone] = useState(tableUser.formattedPhone)
    const [grade, setGrade] = useState(tableUser.grade)
    const [err, setErr] = useState("")

    const { setShowLoadingScreen } = useContext(AdminContext)

    const onClose = () => {
        setShow(false)
        setFirstName(tableUser.firstName)
        setLastName(tableUser.lastName)
        setGrade(tableUser.grade)
        setPhone(tableUser.formattedPhone)
        setErr("")
    }

    const editUser = async e => {

        e.preventDefault()

        if (phone !== "" && !isValidE164(toE164(phone))) {
            setErr("Please enter a valid phone number!")
            return
        }

        setShowLoadingScreen(true)

        const editUser = httpsCallable(functions, 'editUser')
        const result = await editUser({ 
            id: tableUser.id, 
            firstName: firstName, 
            lastName: lastName,
            grade: grade,
            phone: toE164(phone),
            formattedPhone: phone
        })
        if (result.data.error) {
            console.log(result.data.error)
        }        
        setShowLoadingScreen(false)
        setShow(false)
    }

    const handlePhoneChange = event => {
        const newValue = event.target.value.replace(/[^\d]/g, ''); // Remove all non-digit characters
        setPhone(newValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')); // Add hyphens and parentheses
    };

    return (
        <>
            <button className="btn edit-user-btn" onClick={() => setShow(true)}>Edit User</button>
            <Modal show={show} onClose={onClose}>
                <form>
                    <h2 style={{ marginBottom: "30px" }}>Edit {tableUser.email}</h2>
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
                    <div className="input-group">
                        <input required id="sign-up-phone" type="text" value={phone} onChange={handlePhoneChange}/>
                        <span className="bar"></span>
                        <label htmlFor="sign-up-phone">Phone</label>
                    </div>
                    <label htmlFor="sign-up-grade">Grade: </label>
                    <div className="select-grade">
                        <div className="select-grade-option" id={`${grade === "9" && "grade-selected"}`} onClick={() => setGrade("9")}>Grade 9</div>
                        <div className="select-grade-option" id={`${grade === "10" && "grade-selected"}`} onClick={() => setGrade("10")}>Grade 10</div>
                        <div className="select-grade-option" id={`${grade === "11" && "grade-selected"}`} onClick={() => setGrade("11")}>Grade 11</div>
                        <div className="select-grade-option" id={`${grade === "12" && "grade-selected"}`} onClick={() => setGrade("12")}>Grade 12</div>
                        <div className="select-grade-option" id={`${grade === "staff" && "grade-selected"}`} onClick={() => setGrade("staff")}>Staff</div>
                    </div>
                    <p style={{ color: "red" }}>{err}</p>
                    <button className="btn submit-edit-user" type="submit" onClick={editUser}>Edit User</button>
                </form>
            </Modal>
        </>
    )
}

export default EditUser