import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { httpsCallable } from "@firebase/functions"
import { query, collection, onSnapshot } from "@firebase/firestore"
import { functions, db } from "../firebase"
import UserContext from "../contexts/UserContext"
import LoadingScreen from "../components/general/LoadingScreen"
import "./TransferOwnership.css"

export const TransferOwnership = () => {

    const user = useContext(UserContext)

    const [outgoingRequest, setOutgoingRequest] = useState(false)
    const [email, setEmail] = useState("")
    const [confirm, setConfirm] = useState(false)
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)
    const [err, setErr] = useState("")

    const sendOwnershipRequest = async () => {
        setShowLoadingScreen(true)
        const addOutgoingTransferRequest = httpsCallable(functions, "addOutgoingTransferRequest")
        const result = await addOutgoingTransferRequest({
            from: user.email,
            to: email
        })
        if (!result.data.requestMade) {
            setErr(result.data.error)
        } else {
            setErr("")
        }
        setShowLoadingScreen(false)
    }

    const revokeOwnershipRequest = async () => {
        setShowLoadingScreen(true)
        const rescindOutgoingTransferRequest = httpsCallable(functions, "rescindOutgoingTransferRequest")
        const result = await rescindOutgoingTransferRequest()
        if (!result.data.requestFulfilled) {
            setErr(result.data.error)
        } else {
            setOutgoingRequest(false)
            setErr("")
        }
        setShowLoadingScreen(false)
        setEmail("")
        setConfirm(false)
    }

    

    useEffect(() => {
        const requestInit = async () => {
            const q = query(collection(db, "transfers"));
            await onSnapshot(q, (querySnapshot) => {
                if(!querySnapshot.empty) {
                    querySnapshot.forEach(doc => {
                        if (doc.id === user.uid) {
                            setOutgoingRequest(true)
                            setEmail(doc.data().to)
                        }
                    })
                } else {
                    setOutgoingRequest(false)
                    setEmail("")
                }
                
            })
        }
        requestInit()
    }, [user])

    return (
        <>
            <LoadingScreen show={showLoadingScreen}/>
            <div className="blue-block"></div>
            <div className="white-block"></div>
            <div className="transfer-ownership-container">
                <div className="transfer-ownership">
                    {outgoingRequest ? 
                        <>
                            <h1>Transfer Request Sent!</h1>
                            <p>
                                A transfership offer has been sent to {email}. They must be an admin in order to accept
                                this request. They have 24 hours to accept the offer or else the offer will be deleted, 
                                in which case you may resend the transfership offer.
                            </p>
                            <button className="btn revoke-transfer-request" onClick={revokeOwnershipRequest}>Revoke Tranfer Request to {email}</button>
                            <p style={{ color: "red" }}>{err}</p>
                            <Link to="/"><button className="btn back-to-home">Back to Home</button></Link>
                        </> : 
                        <>
                            <h1>Transfer Ownership</h1>
                            {confirm ? 
                                <>
                                    <div className="input-group">
                                        <input required id="transfer-ownership-email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                                        <span className="bar"></span>
                                        <label htmlFor="transfer-ownership-email">New Owner Email</label>
                                    </div>
                                    <button className="btn transfer-ownership-btn" onClick={sendOwnershipRequest}>Transfer Ownership</button>
                                    <p style={{ color: "red" }}>{err}</p>
                                </>
                                :
                                <>
                                    <p style={{ paddingBottom: "30px"}}>
                                        Tranferring your ownership will grant someone else complete control over ELCA SGA. 
                                        Once you transfer your ownership, you cannot get it back. Are you sure you want to
                                        transfer your ownership?
                                    </p>
                                    <button className="btn confirm-transfer" onClick={() => setConfirm(true)}>Confirm</button>      
                                </>
                            }
                           
                            
                        </>}
                </div>
            </div>
            
            
        </>
    )
}

export default TransferOwnership