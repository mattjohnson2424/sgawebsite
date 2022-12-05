import { useContext, memo } from "react"
import UserContext from "../../contexts/UserContext"
import { doc, updateDoc, getDoc, deleteField } from "@firebase/firestore"
import { db } from "../../firebase"
import "./SignUpForEvent.css"
import { compareProps } from "../../helpers/memoHelpers"

export const SignUpForEvent = memo(({ hasSignUps, signUps, hasMaxSignUps, maxSignUps, id }) => {

    const user = useContext(UserContext)

    const signUp = async () => {
        if (Object.keys(signUps).length < maxSignUps || maxSignUps === null) {
            const docSnap = await getDoc(doc(db, "users", user.uid))
            await updateDoc(doc(db, 'events', id), {
                [`signUps.${user.uid}`]: {
                    ...docSnap.data()
                }
            })
        }
    }

    const unSignUp = async () => {
        await updateDoc(doc(db, 'events', id), {
            [`signUps.${user.uid}`]: deleteField()
        });
    }

    return (
        <>
            {hasSignUps && 
                <>
                    {((Object.keys(signUps).length < maxSignUps || !hasMaxSignUps) && !Object.keys(signUps).includes(user.uid)) && 
                        <div className="sign-up-container">
                            <p>This event has a sign up attached!</p>
                            <button className="btn sign-up" onClick={signUp}>Sign Up</button>
                        </div>            
                    }
                    {Object.keys(signUps).includes(user.uid) && 
                        <div className="sign-up-container">
                            <p>You are signed up for this event!</p>
                            <button className="btn design-up" onClick={unSignUp}>Cancel Registration</button>
                        </div>
                    }
                    {hasMaxSignUps && <p>{`${Object.keys(signUps).length}/${maxSignUps} people signed up`}</p>}
                </>
            }
        </>
    )
}, compareProps)

export default SignUpForEvent