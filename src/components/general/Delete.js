import React, { useState, useEffect } from "react"

export const Delete = props => {

    const [showConfirm, setShowConfirm] = useState(false)

    useEffect(() => {
        setShowConfirm(false)
    }, [props])

    return (
        <>
            {!showConfirm && (
                <>
                    <button onClick={e => setShowConfirm(true)}>{props.children}</button>
                    <br/>
                </>
            )}
            {showConfirm && (
                    <>
                        <p>Confirm Delete?</p>
                        <button onClick={props.onDelete}>Yes</button>
                        <button onClick={e => setShowConfirm(false)}>No</button>
                        <br/>
                    </>
            )}
        </>
    )
}

export default Delete;