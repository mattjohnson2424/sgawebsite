import { useContext, useState } from "react"
import { updateDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase"
import EventsContext from "../../contexts/EventsContext"
import Modal from "../general/Modal"
import "./EditEventSignUps.css"

export const EditEventSignUps = ({ id, hasMaxSignUps, maxSignUps }) => {

    const [show, setShow] = useState(false)
    const [maxCap, setMaxCap] = useState(hasMaxSignUps)
    const [numPeople, setNumPeople] = useState(maxSignUps)
    const {setShowLoadingScreen } = useContext(EventsContext)
    

    const onClose = () => {
        setShow(false)
        setMaxCap(hasMaxSignUps)
        setNumPeople(maxSignUps)
    }

    const editSignUps = async e => {

        e.preventDefault()

        setShowLoadingScreen(true)

        await updateDoc(doc(db, 'events', id), {
            maxSignUps: numPeople,
            hasMaxSignUps: maxCap
        });
        setShowLoadingScreen(false)
        setShow(false)
    }

    const onNumPeopleChange = e => {
        if (e.target.value < 1) {
            setNumPeople(1)
        } else {
            setNumPeople(e.target.value)
        }
    }

    return (
        <>
            <button className="btn show-edit-sign-ups" onClick={() => setShow(true)}>Edit Sign Ups</button>
            <Modal show={show} onClose={onClose}>
                <form>
                    {maxCap ? 
                        <div className="edit-sign-ups-container">
                            <p>How many people should attend?</p>
                            <input type="number" value={numPeople} onChange={onNumPeopleChange}/>
                            <button className="btn make-sign-ups-unlimited" onClick={e => setMaxCap(false)}>Make sign ups unlimited</button>
                        </div> : 
                        <div className="edit-sign-ups-container">
                            <p>Unlimited students can sign up</p>
                            <button className="btn add-sign-ups-cap" onClick={e => setMaxCap(true)}>Add sign up cap</button>
                        </div>
                    }
                    <button className="btn edit-sign-ups-btn" onClick={editSignUps}>Save Changes</button>
                </form>
            </Modal>
        </>
    )
}

export default EditEventSignUps