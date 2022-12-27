import { useContext, useState } from "react"
import SettingsContext from "../../contexts/SettingsContext"
import { isValidE164, toE164 } from "../../helpers/phoneHelpers"
import { doc, updateDoc } from "@firebase/firestore"
import { db } from "../../firebase"
import "./EditPhone.css"

export const EditPhone = ({ user }) => {

    const [phone, setPhone] = useState(user && user.formattedPhone)
    const [err, setErr] = useState("")
    const { setShowLoadingScreen } = useContext(SettingsContext)

    const handlePhoneChange = event => {
        const newValue = event.target.value.replace(/[^\d]/g, ''); // Remove all non-digit characters
        setPhone(newValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')); // Add hyphens and parentheses
    };

    const submitNewNumber = async () => {
        if (!isValidE164(toE164(phone))) {
            setErr("Enter Valid Phone Number")
            return
        }
        setShowLoadingScreen(true)
        await updateDoc(doc(db, "users", user.id), {
            phone: toE164(phone),
            formattedPhone: phone
        })
        setShowLoadingScreen(false)

    }

    return (
        <div className="edit-phone">
            <h2>Phone Number</h2>
            <div className="input-group">
                <input required id="sign-up-phone" type="text" onChange={handlePhoneChange} value={phone}/>
                <span className="bar"></span>
                <label htmlFor="sign-up-phone">Phone</label>
            </div>
            <p style={{ color: "red" }}>{err}</p>
            {phone !== user.formattedPhone && <button className="btn save-phone-btn" onClick={submitNewNumber}>Save Phone Number</button>}
        </div>
    )
}

export default EditPhone