import { useContext, useState } from "react"
import AdminContext from "../../contexts/AdminContext"
import { httpsCallable } from "@firebase/functions"
import { functions } from "../../firebase"
import Modal from "../general/Modal"

export const PromoteUser = ({ tableUser }) => {

    const { setShowLoadingScreen } = useContext(AdminContext)
    const [show, setShow] = useState(false)

    const addAdminRole = async () => {
        setShowLoadingScreen(true)
        const addAdminRole = httpsCallable(functions, 'addAdminRole')
        const result = await addAdminRole({ id: tableUser.id })
        if (result.data.error) {
            console.log(result.data.error)
        }
        setShowLoadingScreen(false)
        setShow(false)
    }

    const addExecRole = async () => {
        setShowLoadingScreen(true)
        const addExecRole = httpsCallable(functions, 'addExecRole')
        const result = await addExecRole({ id: tableUser.id })
        if (result.data.error) {
            console.log(result.data.error)
        }
        setShowLoadingScreen(false)
        setShow(false)
    }

    const addOfficerRole = async () => {
        setShowLoadingScreen(true)
        const addOfficerRole = httpsCallable(functions, 'addOfficerRole')
        const result = await addOfficerRole({ id: tableUser.id })
        if (result.data.error) {
            console.log(result.data.error)
        }
        setShowLoadingScreen(false)
        setShow(false)
    }

    return (
        <>
            {tableUser.officer ? tableUser.exec ? tableUser.admin ?
                <button className="btn disabled-btn" disabled>Admin</button> :
                <button className="btn promote-btn" onClick={() => setShow(true)}>Make Admin</button> :
                <button className="btn promote-btn" onClick={() => setShow(true)}>Make Exec</button> :
                <button className="btn promote-btn" onClick={() => setShow(true)}>Make Officer</button>
            }

            <Modal show={show} onClose={() => setShow(false)}>
                <h2>Are you sure you want to promote {tableUser.firstName} {tableUser.lastName} to {tableUser.officer ? tableUser.exec ?  "Admin" : "Exec" : "Officer"} status?</h2>
                <div className="modal-btn-container">
                    {tableUser.officer ? tableUser.exec ?
                        <button className="btn promote-modal-btn" onClick={addAdminRole}>Make Admin</button> :
                        <button className="btn promote-modal-btn" onClick={addExecRole}>Make Exec</button> :
                        <button className="btn promote-modal-btn" onClick={addOfficerRole}>Make Officer</button>
                    }
                    <button className="btn cancel-modal-btn" onClick={() => setShow(false)}>Cancel</button>
                </div>
            </Modal>
        </>
    )
}

export default PromoteUser