import { useContext, useState } from "react"
import { updateDoc, doc } from "@firebase/firestore"
import { db } from "../../firebase"
import Modal from "../general/Modal"
import HomeContext from "../../contexts/HomeContext"

export const EditAnnouncement = ({ announcement }) => {

    const [show, setShow] = useState(false)
    const [name, setName] = useState(announcement.name)
    const [description, setDescription] = useState(announcement.description)
    const { setShowLoadingScreen } = useContext(HomeContext)

    const editAnnouncement = async e => {
        e.preventDefault()
        setShowLoadingScreen(true)
        setShow(false)
        await updateDoc(doc(db, 'announcements', announcement.id), {
            name: name,
            description: description
        });
        setShowLoadingScreen(false)
    }

    const onClose = () => {
        setShow(false)
        setName(announcement.name)
        setDescription(announcement.description)
    }

    return (
        <>
            <button className="btn announcement-btn" onClick={e => setShow(true)}>Edit</button>
            <Modal show={show} onClose={onClose}>   
                <form className="edit-announcement">
                    <h2>Edit Announcement</h2>
                    <div className="input-group">
                        <input required id="edit-announcement-name" type="text" value={name} onChange={e => setName(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="edit-announcement-name" >Name</label>
                    </div>
                    <div className="input-group">
                        <textarea required className="txtarea" id="edit-announcement-description" type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                        <span className="bar"></span>
                        <label htmlFor="edit-announcement-description">Description</label>
                    </div>
                    <input className="btn submit-edit-announcement" type="submit" onClick={editAnnouncement}/>
                </form>
            </Modal>
        </>
    )
}

export default EditAnnouncement