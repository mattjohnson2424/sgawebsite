import React, { useState } from "react"
import Modal from "./Modal"
import "./Delete.css"

export const Delete = props => {

    const [show, setShow] = useState(false)

    const onClose = () => {
        setShow(false)
    }

    return (
        <>
            <button className={props.className} onClick={e => setShow(true)}>{props.children}</button>
            <br/>
            <Modal show={show} onClose={onClose}>
                <div className="delete-modal">
                    <h2>Confirm Delete?</h2>
                    <div className="modal-btn-row">
                        <button className="btn delete-btn" onClick={() => {
                            setShow(false)
                            props.onDelete()
                        }}>Delete</button>
                        <button className="btn cancel-delete-btn" onClick={() => setShow(false)}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </>    
    )
}

export default Delete;