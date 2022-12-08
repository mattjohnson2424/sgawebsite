import React, { useState, useContext } from "react";
import { httpsCallable } from "@firebase/functions"
import { functions } from "../../firebase";
import Modal from "../general/Modal";
import "./CreateUser.css"
import AdminContext from "../../contexts/AdminContext";
import useWindowDimensions from "../general/useWindowDimensions"


export const CreateUser = () => {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [grade, setGrade] = useState("9")
    const [err, setErr] = useState("")

    const [show, setShow] = useState(false)
    const { setShowLoadingScreen } = useContext(AdminContext)
    const { width } = useWindowDimensions()

    const signUp = async e => {
        e.preventDefault()
        try {
            // if(!email.includes("elcachargers.org") && !email.includes("eagleslanding.org")) {
            //     throw new Error("Please use an ELCA email!")
            // }
            if(!(email.includes("@") && email.includes("."))) {
                throw new Error("Please enter a valid email!")
            }
            if(!(firstName.length > 0 && lastName.length > 0)) {
                throw new Error("Please enter a first and last name")
            }
            if(grade === "") {
                throw new Error("Please select a grade!")
            }
            

            setShowLoadingScreen(true)

            // create user without logging in
            const createUser = httpsCallable(functions, 'createUser');
            const result = await createUser({
                email: email,
                grade: grade,
                firstName: firstName,
                lastName: lastName
            })
            if (result.data.error) {
                console.log(result.data.error)
            }

            setGrade("")
            setEmail("")
            setFirstName("")
            setLastName("")
            setErr("")
            setShowLoadingScreen(false)
            setShow(false)

        } catch (err) {
            setErr(err.message)
        }
        
    }

    const onClose = () => {
        setShow(false)
        setEmail("")
        setFirstName("")
        setLastName("")
        setGrade("")
        setErr("")
    }

    return (
        <>
            <button className={`btn show-create-user-btn ${width < 768 && "plus"}`} onClick={() => setShow(true)}>{width >= 768 ? "Add Account to Whitelist" : "+"}</button>
            <Modal className="create-user-modal" show={show} onClose={onClose}>
                <form id="sign-up">
                    <h2>Add Account to Whitelist</h2>
                    <div className="input-group">
                        <input required id="sign-up-email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
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
                    <div className="select-grade">
                        <div className="select-grade-option" id={`${grade === "9" && "grade-selected"}`} onClick={() => setGrade("9")}>Grade 9</div>
                        <div className="select-grade-option" id={`${grade === "10" && "grade-selected"}`} onClick={() => setGrade("10")}>Grade 10</div>
                        <div className="select-grade-option" id={`${grade === "11" && "grade-selected"}`} onClick={() => setGrade("11")}>Grade 11</div>
                        <div className="select-grade-option" id={`${grade === "12" && "grade-selected"}`} onClick={() => setGrade("12")}>Grade 12</div>
                        <div className="select-grade-option" id={`${grade === "staff" && "grade-selected"}`} onClick={() => setGrade("staff")}>Staff</div>
                    </div>
                    <p className="err">{err}</p>
                    <button className="btn create-user-btn" type="submit" onClick={signUp}>Whitelist User</button>
                </form>
            </Modal>
        </>
    )
}

export default CreateUser;