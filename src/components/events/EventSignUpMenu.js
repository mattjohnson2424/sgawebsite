import { useContext, useState } from "react"
import EventContext from "../../contexts/EventContext"
import { updateDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase"
import Modal from "../general/Modal"

export const EventSignUpMenu = () => {

    const [show, setShow] = useState(false)
    const [numPeople, setNumPeople] = useState(10)
    const [maxCap, setMaxCap] = useState(true)
    const event = useContext(EventContext)

    const onNumPeopleChange = e => {
        if (e.target.value < 1) {
            setNumPeople(1)
        } else {
            setNumPeople(e.target.value)
        }
    }

    const addSignUps = async () => {
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
            <button onClick={e => setShow(true)}>Add Sign Ups</button>
            <Modal show={show} onClose={onClose}>
                {maxCap ? <>
                    <label htmlFor="num-people">How many people should attend?</label>
                    <input id="num-people" type="number" value={numPeople} onChange={onNumPeopleChange}/>
                    <br/>
                    <button onClick={e => setMaxCap(false)}>Make sign ups unlimited</button>
                </> : <>
                    <p>Unlimited students can sign up</p>
                    <button onClick={e => setMaxCap(true)}>Add sign up cap</button>
                </>}
                <button onClick={addSignUps}>Finish</button>
            </Modal>
            
        </>
    )
}

export default EventSignUpMenu