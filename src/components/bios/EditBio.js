import { useContext, useState } from "react"
import BioContext from "../../contexts/BioContext"
import Modal from "../general/Modal"
import { updateDoc, doc } from "@firebase/firestore"
import { db, storage } from "../../firebase"
import { uploadBytes, getDownloadURL, ref } from "@firebase/storage"
import "./EditBio.css"

export const EditBio = () => {

    const bio = useContext(BioContext)

    const [show, setShow] = useState(false)
    const [name, setName] = useState(bio.name)
    const [description, setDescription] = useState(bio.description)
    const [imageUpload, setImageUpload] = useState(null)
    const [filePath, setFilePath] = useState("")

    

    const onClose = () => {
        setShow(false)
    }

    const updateBio = async e => {

        e.preventDefault()
        setShow(false)

        if (!imageUpload) {
            await updateDoc(doc(db, 'bios', bio.id), {
                name: name,
                description: description
            });
        } else {
            const storagePath = `bios/${Date.now().toString()}.${imageUpload.name.split(".")[1]}`
            const biosRef = ref(storage, storagePath)
            await uploadBytes(biosRef, imageUpload).then(() => {
                console.log("Image uploaded")
            })

            const downloadURL = await getDownloadURL(biosRef)

            await updateDoc(doc(db, 'bios', bio.id), {
                name: name,
                description: description,
                photo: downloadURL,
                storagePath: storagePath
            });
        }
    }

    const openFileSelector = e => {
        e.preventDefault()
        document.getElementById("upload-profile-photo").click()
    }

    const onChangeFile = e => {
        setImageUpload(e.target.files[0])
        setFilePath(e.target.value)
    }

    return (
        <>
            <button className="btn edit-bio-btn" onClick={() => setShow(true)}>Edit</button>
            <Modal show={show} onClose={onClose}>
                <h2>Edit Bio</h2>
                <form>
                    <div className="input-group">
                        <input required value={name} onChange={e => setName(e.target.value)}id="profile-name" type="text"/>
                        <span className="bar"></span>
                        <label htmlFor="profile-name">Name</label>
                    </div>
                    
                    <div className="input-group">
                        <textarea required className="txtarea" value={description} onChange={e => setDescription(e.target.value)} id="profile-bio" type="text"/>
                        <span className="bar"></span>
                        <label htmlFor="profile-description">Bio</label>
                    </div>
                    <button className="btn upload-photo" onClick={openFileSelector}>Upload Photo</button>
                    <p>File Selected: {filePath === "" ? "None" : filePath.split("\\")[2]}</p>
                    <input className="file-input" onChange={onChangeFile} id="upload-profile-photo" type="file"/>
                    <br/>
                    <input className="btn submit-edit-bio" type="submit" onClick={updateBio}/>
                </form>
            </Modal>
        </>
    )
}

export default EditBio