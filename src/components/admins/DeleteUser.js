import { useContext, useEffect, useState } from "react"
import Modal from "../general/Modal"
import { httpsCallable } from "@firebase/functions"
import { functions } from "../../firebase"
import "./DeleteUser.css"
import AdminContext from "../../contexts/AdminContext"

export const DeleteUser = ({ user }) => {

    const [show, setShow] = useState(false)
    const [email, setEmail] = useState("")
    const { setShowLoadingScreen } = useContext(AdminContext)
    const [allowDelete, setAllowDelete] = useState(false)

    const deleteUser = async () => {
        if (allowDelete) {
            setShowLoadingScreen(true)
            const deleteUser = httpsCallable(functions, 'deleteUser')
            const result = await deleteUser({ id: user.id })
            console.log(result)
            setShowLoadingScreen(false)
            setShow(false)
        }
    }

    const onClose = () => {
        setShow(false)
        setEmail("")
    }

    useEffect(() => {
        if (email === user.email) {
            // allowing button to be clicked after 1500ms
            setTimeout(() => {
                setAllowDelete(true)
            }, 1500)
        } else {
            setAllowDelete(false)
        }
    }, [email, user])

    return (
        <>
            <button className="btn show-delete-user" onClick={() => setShow(true)}>Un-Whitelist</button>
            <Modal show={show} onClose={onClose}>
                <h2>Delete User</h2>
                <div className="input-group">
                    <input required id="enter-user-email-to-delete" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                    <span className="bar"></span>
                    <label htmlFor="enter-user-email-to-delete">Enter "{user.email}" to un-whitelist</label>
                </div>
                
                
                <div className={`btn delete-user ${allowDelete ? 'delete-allowed' : 'delete-not-allowed'}`} disabled={!allowDelete} onClick={deleteUser}>Un-Whitelist</div>
            </Modal>
        </>
    )
}

export default DeleteUser