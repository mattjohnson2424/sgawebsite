import { useContext, useState } from "react"
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage"
import { storage } from "../../firebase"
import UserContext from "../../contexts/UserContext"
import { updateProfile } from "@firebase/auth"
import { auth } from "../../firebase"

export const ChangeProfilePicture = () => {

    const [imageUpload, setImageUpload] = useState(null)
    const user = useContext(UserContext)

    const uploadImage = async e => {

        e.preventDefault()
        if (imageUpload == null) return;

        const profilePicRef = ref(storage, `profilepics/${user.uid}`)
        uploadBytes(profilePicRef, imageUpload).then(() => {
            console.log("Image uploaded")
        })

        const downloadURL = await getDownloadURL(profilePicRef)

        await updateProfile(auth.currentUser, {
            photoURL: downloadURL
        })

    }

    return (
        <form>
            <input type="file" onChange={e => setImageUpload(e.target.files[0])}/>
            <input onClick={uploadImage} type="submit"/>
        </form>
    )
}

export default ChangeProfilePicture