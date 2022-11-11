import React, { useState } from "react"
import Modal from "./Modal"

export const Delete = props => {

    const [show, setShow] = useState(false)

    const onClose = () => {
        setShow(false)
    }

    return (
        <>
            <button onClick={e => setShow(true)}>{props.children}</button>
            <br/>
            <Modal show={show} onClose={onClose}>
                <p>Confirm Delete?</p>
                <button onClick={e => {
                    setShow(false)
                    props.onDelete()
                }}>Yes</button>
                <button onClick={e => setShow(false)}>No</button>
                <br/>
            </Modal>
        </>    
    )
}

export default Delete;