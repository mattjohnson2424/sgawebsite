import { useContext, useEffect, useState } from "react"
import BioContext from "../../contexts/BioContext"
import UserContext from "../../contexts/UserContext"
import Modal from "../general/Modal"
import Delete from "../general/Delete"
import { deleteDoc, updateDoc, doc } from "@firebase/firestore"
import { db, storage } from "../../firebase"
import { uploadBytes, getDownloadURL, ref, deleteObject } from "@firebase/storage"

export const Bio = props => {

    const [show, setShow] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [imageUpload, setImageUpload] = useState(null)
    const bio = useContext(BioContext)
    const user = useContext(UserContext)

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

    const onDelete = async () => {
        if (bio.storagePath) {
            const imageRef = ref(storage, bio.storagePath);
            await deleteObject(imageRef)
        }
        await deleteDoc(doc(db, 'bios', bio.id));
    }

    useEffect(() => {
        setName(bio.name)
        setDescription(bio.description)
    }, [bio])

    return (
        <div className="bio-container" key={props.index}>
            <img className="bio-photo" src={bio.photo} alt={bio.name}/>
            <h2>{bio.name}</h2>
            <p>{bio.description}</p>
            {user.admin && <>
                <button onClick={e => setShow(true)}>Edit</button>
                <Modal show={show} onClose={onClose}>
                    <h2>Edit Bio</h2>
                    <form>
                        <label htmlFor="profile-name">Name: </label>
                        <input value={name} onChange={e => setName(e.target.value)}id="profile-name" type="text"/>
                        <br/>
                        <label htmlFor="profile-bio">Bio: </label>
                        <input value={description} onChange={e => setDescription(e.target.value)}id="profile-bio" type="text"/>
                        <br/>
                        <label htmlFor="profile-photo">Upload Photo: </label>
                        <input onChange={e => setImageUpload(e.target.files[0])}id="profile-photo" type="file"/>
                        <br/>
                        <input type="submit" onClick={updateBio}/>
                    </form>
                </Modal>
                <Delete onDelete={onDelete}>Delete Bio</Delete>
            </>}
            
        </div>
    )
}

export default Bio