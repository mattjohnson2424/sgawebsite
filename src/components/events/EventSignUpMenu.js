import { useState } from "react"
import { updateDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase"
import Modal from "../general/Modal"
import "./EventSignUpMenu.css"

export const EventSignUpMenu = ({ event }) => {

    const [show, setShow] = useState(false)
    const [numPeople, setNumPeople] = useState(10)
    const [maxCap, setMaxCap] = useState(true)

    const onNumPeopleChange = e => {
        if (e.target.value < 1) {
            setNumPeople(1)
        } else {
            setNumPeople(e.target.value)
        }
    }

    const addSignUps = async e => {

        e.preventDefault()

        let cap = null
        if (maxCap) cap = numPeople
        await updateDoc(doc(db, 'events', event.id), {
            hasSignUps: true,
            maxSignUps: cap
        });
    }

    const onClose = () => {
        setShow(false)
        setMaxCap(false)
        setNumPeople(10)
    }

    return (
        <>
            <button className="btn add-sign-ups-btn" onClick={e => setShow(true)}>Add Sign Ups</button>
            <Modal show={show} onClose={onClose}>
                <form>
                    {maxCap ? 
                    <div className="add-sign-ups-container">
                        <p>How many people should attend?</p>
                        <input type="number" value={numPeople} onChange={onNumPeopleChange}/>
                        <button className="btn make-sign-ups-unlimited" onClick={e => setMaxCap(false)}>Make sign ups unlimited</button>
                    </div> : 
                    <div className="add-sign-ups-container">
                        <p>Unlimited students can sign up</p>
                        <button className="btn add-sign-ups-cap" onClick={e => setMaxCap(true)}>Add sign up cap</button>
                    </div>}
                    <button className="btn finish-sign-ups-btn" onClick={addSignUps}>Create Sign Ups</button>
                </form>
            </Modal>
            
        </>
    )
}

export default EventSignUpMenu