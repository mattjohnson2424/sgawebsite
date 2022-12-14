import { useContext } from "react"
import BioContext from "../../contexts/BioContext"
import UserContext from "../../contexts/UserContext"
import Delete from "../general/Delete"
import { deleteDoc, doc } from "@firebase/firestore"
import { db, storage } from "../../firebase"
import { ref, deleteObject } from "@firebase/storage"
import EditBio from "./EditBio"
import "./Bio.css"

export const Bio = ({ bio }) => {

    const user = useContext(UserContext)
    const { setShowLoadingScreen } = useContext(BioContext)
    
    const onDelete = async () => {
        setShowLoadingScreen(true)
        if (bio.storagePath) {
            const imageRef = ref(storage, bio.storagePath);
            await deleteObject(imageRef)
        }
        await deleteDoc(doc(db, 'bios', bio.id));
        setShowLoadingScreen(false)
    }

    

    return (
        <div className="bio">
            <div className="bio-photo-container">
                <img className="bio-photo" src={bio.photo} alt={bio.name}/>
            </div>
            <h2 className="bio-name">{bio.name}</h2>
            <p className="bio-description">{bio.description}</p>
            {(user.admin || bio.uid === user.uid) && <div className="bio-btn-group">
                <EditBio bio={bio} />
                <Delete deleteText="Are you sure you want to delete this bio?" className="btn delete-bio-btn" onDelete={onDelete}>Delete Bio</Delete>
            </div>}
        </div>
    )
}

export default Bio