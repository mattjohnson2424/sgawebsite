import { useState } from "react"
import { updateDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase"
import Modal from "../general/Modal"
import "./EditHelp.css"

export const EditHelp = ({ help }) => {

    const [show, setShow] = useState(false)
    const [editBody, setEditBody] = useState(help.body)

    const editHelp = async () => {
        await updateDoc(doc(db, "help", help.id), {
            body: editBody
        })
        setShow(false)
    }

    const onClose = () => {
        setEditBody(help.body)
        setShow(false)
    }

    return (
        <>
            <button className="btn edit-help" onClick={() => setShow(true)}>Edit Request</button>
            <Modal show={show} onClose={onClose}>
                <div className="edit-help-input">
                    <h2 style={{ textAlign: "center"}}>Edit Help Request</h2>
                    <div className="input-group">
                        <textarea required className="txtarea" id="add-announcement-description" value={editBody} onChange={e => setEditBody(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="add-announcement-description">Make Help Request</label>
                    </div>
                    <button className="btn add-help-btn" onClick={editHelp}>Make Help Request</button>
                </div>
            </Modal>
        </>
    )
}

export default EditHelp