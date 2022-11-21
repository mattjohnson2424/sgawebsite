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
            <button onClick={() => setShow(true)}>Delete User</button>
            <Modal show={show} onClose={() => setShow(false)}>
                <h2>Delete User</h2>
                <label htmlFor="enter-user-email-to-delete">Enter {user.firstName} {user.lastName}'s Email to Delete: </label>
                <input id="enter-user-email-to-delete" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                <div className={`delete-user ${allowDelete ? 'delete-allowed' : 'delete-not-allowed'}`} onClick={deleteUser}>Delete User</div>
            </Modal>
        </>
    )
}

export default DeleteUser