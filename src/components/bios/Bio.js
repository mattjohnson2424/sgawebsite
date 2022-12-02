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
            <div className="bio-photo-container">
                <img className="bio-photo" src={bio.photo} alt={bio.name}/>
            </div>
            <h2 className="bio-name">{bio.name}</h2>
            <p className="bio-description">{bio.description}</p>
            {user.exec && <div className="bio-btn-group">
                <EditBio/>
                <Delete deleteText="Are you sure you want to delete this bio?" className="btn delete-bio-btn" onDelete={onDelete}>Delete Bio</Delete>
            </div>}
        </div>
    )
}

export default Bio