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
            if (result.data.error) {
                console.log(result.data.error)
            }
            setShowLoadingScreen(false)
            setShow(false)
            setEmail("")
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
                <h2>Un-Whitelist User</h2>
                <p>Un-Whitelisting a user will delete all account information, including information on sign ups and attendance</p>
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