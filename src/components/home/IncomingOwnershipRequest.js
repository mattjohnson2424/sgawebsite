import { useContext, useEffect, useState } from 'react'
import { query, collection, onSnapshot } from "@firebase/firestore"
import { httpsCallable } from "@firebase/functions"
import { db, functions } from "../../firebase"
import UserContext from "../../contexts/UserContext"
import "./IncomingOwnershipRequest.css"
import HomeContext from '../../contexts/HomeContext'

export const IncomingOwnershipRequest = () => {

    const [hasIncomingRequest, setHasIncomingRequest] = useState(false)
    const [requestId, setRequestId] = useState("")
    const [requestFrom, setRequestFrom] = useState("")
    const { setShowLoadingScreen } = useContext(HomeContext)
    const user = useContext(UserContext)

    const acceptOffer = async () => {
        setShowLoadingScreen(true)
        const acceptIncomingTransferRequest = httpsCallable(functions, "acceptIncomingTransferRequest");
        const result = await acceptIncomingTransferRequest({ requestId: requestId })
        if (result.data.error) {
            console.log(result.data.error)
        }
        setShowLoadingScreen(false)
    }

    const rejectOffer = async () => {
        setShowLoadingScreen(true)
        const rejectIncomingTransferRequest = httpsCallable(functions, "rejectIncomingTransferRequest");
        const result = await rejectIncomingTransferRequest({ requestId: requestId })
        if (result.data.error) {
            console.log(result.data.error)
        }
        setShowLoadingScreen(false)
    }

    useEffect(() => {

        const requestInit = async () => {
            const q = query(collection(db, "transfers"));
            await onSnapshot(q, (querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(doc => {
                        if (doc.data().to === user.email) {
                            setHasIncomingRequest(true)
                            setRequestId(doc.id)
                            setRequestFrom(doc.data().from)
                        }
                    })
                } else {
                    setHasIncomingRequest(false)
                }
                
            })
        }

        requestInit()
    }, [user])

    return (
        <>
            {hasIncomingRequest &&
                <div className='incoming-ownership-request'>
                    <p>You have been invited to become an owner of ELCA SGA by {requestFrom}!</p>
                    <div className='btn-row'>
                        <button onClick={acceptOffer} className='btn accept-request'>Accept</button>
                        <button onClick={rejectOffer} className='btn reject-request'>Reject</button>
                    </div>
                </div>
            }
            
        </>
    )
}

export default IncomingOwnershipRequest
