import { useState } from "react"
import { updateDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase"
import Modal from "../general/Modal"
import LoadingScreen from "../general/LoadingScreen"
import "./Respond.css"

export const Respond = ({ help }) => {

    const [show, setShow] = useState(false)
    const [response, setResponse] = useState(help.response)
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)
    
    const onClose = () => {
        setResponse(help.response)
        setShow(false)
    }

    const respondToRequest = async () => {
        setShowLoadingScreen(true)
        await updateDoc(doc(db, "help", help.id), {
            response: response
        })
        setShow(false)
        setShowLoadingScreen(false)
    }

    return (
        <>
            <LoadingScreen show={showLoadingScreen}/>
            <button className="btn open-respond" onClick={() => setShow(true)}>Respond</button>
            <Modal show={show} onClose={onClose}>
                <div className="response-input">
                    <h2>Prompt</h2>
                    <p>{help.body}</p>
                    <h2>Response</h2>
                    <div className="input-group">
                        <textarea required className="txtarea" id="add-announcement-description" value={response} onChange={e => setResponse(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="add-announcement-description">Response</label>
                    </div>
                    <button className="btn add-help-btn" onClick={respondToRequest}>Save Response</button>
                </div>
            </Modal>
        </>
    )
}

export default Respond