import { useContext, useState } from "react"
import Modal from "../../components/general/Modal"
import { addDoc, collection } from "@firebase/firestore"
import { db, storage } from "../../firebase"
import { uploadBytes, getDownloadURL, ref } from "@firebase/storage"
import useWindowDimensions from "../general/useWindowDimensions"
import "./AddBio.css"
import BioContext from "../../contexts/BioContext"
import UserContext from "../../contexts/UserContext"

export const AddBio = () => {

    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [imageUpload, setImageUpload] = useState(null)
    const [filePath, setFilePath] = useState("")
    const user = useContext(UserContext)
    const { width } = useWindowDimensions()
    const { setShowLoadingScreen } = useContext(BioContext)

    const addBio = async e => {

        e.preventDefault()
        setShowLoadingScreen(true)

        if (imageUpload == null) return;

        const storagePath = `bios/${Date.now().toString()}.${imageUpload.name.split(".")[1]}`
        const biosRef = ref(storage, storagePath)
        await uploadBytes(biosRef, imageUpload)

        const downloadURL = await getDownloadURL(biosRef)

        let rank;
        if (user.admin) {
            rank = "admin"
        } else {
            rank = "exec"
        }

        await addDoc(collection(db, 'bios'), {
            name: name,
            description: description,
            photo: downloadURL,
            storagePath: storagePath,
            rank: rank
        });

        
        setName("")
        setDescription("")
        setImageUpload(null)
        setShow(false)
        setShowLoadingScreen(false)
    }

    const onClose = () => {
        setShow(false)
        setName("")
        setDescription("")
        setImageUpload(null)
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
            <button className={`btn open-add-bio ${width < 768 && "plus"}`} onClick={e => setShow(true)}>{width >= 768 ? "Add Bio" : "+"}</button>
            <Modal show={show} onClose={onClose}>
                <h2>New Bio</h2>
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
                    <input className="btn submit-add-bio" type="submit" onClick={addBio}/>
                </form>
            </Modal>
        </>
    )
}

export default AddBio