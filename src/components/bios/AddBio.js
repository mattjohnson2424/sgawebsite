import { useState } from "react"
import Modal from "../../components/general/Modal"
import { addDoc, collection } from "@firebase/firestore"
import { db, storage } from "../../firebase"
import { uploadBytes, getDownloadURL, ref } from "@firebase/storage"

export const AddBio = () => {

    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [imageUpload, setImageUpload] = useState(null)

    const addBio = async e => {

        e.preventDefault()
        setShow(false)

        if (imageUpload == null) return;

        const storagePath = `bios/${Date.now().toString()}.${imageUpload.name.split(".")[1]}`
        const biosRef = ref(storage, storagePath)
        await uploadBytes(biosRef, imageUpload).then(() => {
            console.log("Image uploaded")
        })

        const downloadURL = await getDownloadURL(biosRef)

        await addDoc(collection(db, 'bios'), {
            name: name,
            description: description,
            photo: downloadURL,
            storagePath: storagePath
        });

        
        setName("")
        setDescription("")
        setImageUpload(null)
    }

    const onClose = () => {
        setShow(false)
        setName("")
        setDescription("")
        setImageUpload(null)
    }

    return (
        <>
            <button onClick={e => setShow(true)}>Add Exec Bio</button>
            <Modal show={show} onClose={onClose}>
                <h2>Create New Bio</h2>
                <form>
                    <label htmlFor="profile-name">Name: </label>
                    <input value={name} onChange={e => setName(e.target.value)}id="profile-name" type="text"/>
                    <br/>
                    <label htmlFor="profile-description">Bio: </label>
                    <input value={description} onChange={e => setDescription(e.target.value)}id="profile-bio" type="text"/>
                    <br/>
                    <label htmlFor="profile-photo">Upload Photo: </label>
                    <input onChange={e => setImageUpload(e.target.files[0])}id="profile-photo" type="file"/>
                    <br/>
                    <input type="submit" onClick={addBio}/>
                </form>
            </Modal>
        </>
    )
}

export default AddBio