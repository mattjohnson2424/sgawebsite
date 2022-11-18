import React, { useState, useEffect } from "react";
import { httpsCallable } from "@firebase/functions"
import { functions, storage } from "../../firebase";
import Avatar from 'avatar-initials'
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage"


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

            // create and upload user inital pic and get download url
            const initial_png = Avatar.initialAvatar({
                initials: (firstName[0] + lastName[0]).toUpperCase(),
                initial_fg: '#888888',
                initial_bg: '#f4f6f7',
                initial_size: 0, // Defaults to height / 2
                initial_weight: 100,
                initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
            });

            const profilePicRef = ref(storage, `/profilepics/${Date.now()}`)
            await uploadBytes(profilePicRef, initial_png)

            const downloadURL = await getDownloadURL(profilePicRef)

            // create user without logging in
            const createUser = httpsCallable(functions, 'createUser');
            const result = await createUser({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                grade: grade,
                photoURL: downloadURL
            })
            console.log(result.message)

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