import { useContext } from "react"
import BioContext from "../../contexts/BioContext"
import UserContext from "../../contexts/UserContext"
import Delete from "../general/Delete"
import { deleteDoc, doc } from "@firebase/firestore"
import { db, storage } from "../../firebase"
import { ref, deleteObject } from "@firebase/storage"
import EditBio from "./EditBio"
import "./Bio.css"

export const Bio = props => {

    const bio = useContext(BioContext)
    const user = useContext(UserContext)
    
    const onDelete = async () => {
        if (bio.storagePath) {
            const imageRef = ref(storage, bio.storagePath);
            await deleteObject(imageRef)
        }
        await deleteDoc(doc(db, 'bios', bio.id));
    }

    

    return (
        <div className="bio" key={props.index}>
            <img className="bio-photo" src={bio.photo} alt={bio.name}/>
            <h2>{bio.name}</h2>
            <p>{bio.description}</p>
            {user.exec && <>
                <EditBio/>
                <Delete onDelete={onDelete}>Delete Bio</Delete>
            </>}
        </div>
    )
}

export default Bio