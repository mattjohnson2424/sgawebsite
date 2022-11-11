import React, { useState, useEffect } from "react";
import { auth } from "../../firebase"
import { addUser } from "../../helpers/backendHelpers"
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";

export const CreateUser = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [grade, setGrade] = useState("")
    const [err, setErr] = useState("")

    const signUp = async e => {
        e.preventDefault()
        try {
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match!")
            }  
            if(!email.includes("elcachargers.org") && !email.includes("eagleslanding.org")) {
                throw new Error("Please use an ELCA email!")
            }
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            addUser(cred.user.uid, {
                firstName: firstName,
                lastName: lastName,
                grade: grade,
                // photoURL: "gs://elcastudentgovernment.appspot.com/profilepics/blank-user.png"
            })


            // create user without logging in
            // const createUser = httpsCallable(functions, 'createUser');
            // const result = await createUser({
            //     email: email,
            //     password: password
            // })
            // console.log(result)

            setEmail("")
            setPassword("")
            setConfirmPassword("")
            setFirstName("")
            setLastName("")
            setGrade("")

        } catch (err) {
            setErr(err.message)
        }
        
    }

    useEffect(() => {
        if(password !== confirmPassword && confirmPassword !== "") {
            setErr("Passwords do not match!")
        } else {
            setErr("")
        }
    }, [password, confirmPassword])

    return (
        <form id="sign-up">
            <label htmlFor="sign-up-email">Email: </label>
            <input id="sign-up-email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
            <br/>
            <label htmlFor="sign-up-password">Password: </label>
            <input id="sign-up-password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <br/>
            <label htmlFor="sign-up-confirm-password">Confirm Password: </label>
            <input id="sign-up-confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            <br/>
            <label htmlFor="sign-up-first-name">First Name: </label>
            <input id="sign-up-first-name" type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
            <br/>
            <label htmlFor="sign-up-last-name">Last Name: </label>
            <input id="sign-up-last-name" type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
            <br/>
            <label htmlFor="sign-up-grade">Grade: </label>
            <select value={grade} id="sign-up-grade" name="grade" onChange={e => setGrade(e.target.value)}>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>
            <br/>
            <p>{err}</p>
            <input type="submit" onClick={signUp}/>
        </form>
    )
}

export default CreateUser;