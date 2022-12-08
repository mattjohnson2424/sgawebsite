import { useContext, useState } from "react"
import { httpsCallable } from "@firebase/functions"
import { functions } from "../../firebase"
import AdminContext from "../../contexts/AdminContext"
import Modal from "../general/Modal"

export const DemoteUser = ({ tableUser }) => {

    const { setShowLoadingScreen } = useContext(AdminContext)
    const [show, setShow] = useState(false)

    const demoteUser = async () => {
        setShowLoadingScreen(true)
        const demoteUser = httpsCallable(functions, 'demoteUser')
        const result = await demoteUser({ id: tableUser.id })
        if (result.data.error) {
            console.log(result.data.error)
        }
        setShowLoadingScreen(false)
        setShow(false)
    }

    return (
        <>  
            {tableUser.admin || tableUser.officer ? 
                <button className="btn demote-btn" onClick={() => setShow(true)}>Demote</button> : 
                <button className="btn disabled-btn" disabled>Member</button>
            }
            <Modal show={show} onClose={() => setShow(false)}>
                <h2>Are you sure you want to demote {tableUser.firstName} {tableUser.lastName}?</h2>
                <div className="modal-btn-container">
                    <button className="btn demote-modal-btn" onClick={demoteUser}>Demote</button>
                    <button className="btn cancel-modal-btn" onClick={() => setShow(false)}>Cancel</button>
                </div>
            </Modal>
        </>
    )
}

export default DemoteUser