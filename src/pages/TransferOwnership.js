// import { useState } from "react"
// import { auth } from "../firebase"

export const TransferOwnership = () => {

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    // const transfer = async () => {
        
    // }

    return (
        <>
            <h1>Transfer Ownership</h1>
            <p>
                Tranferring your ownership will grant someone else complete control over ELCA SGA. 
                Once you transfer your ownership, you cannot get it back. Are you sure you want to
                transfer your ownership?
            </p>
            <div className="input-group">
                <input required id="transfer-ownership-email" type="text"/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label htmlFor="transfer-ownership-email">Enter User email to transfer ownership</label>
            </div>
            <div className="input-group">
                <input required id="password" type="password"/>
                <span className="highlight"></span>
                <span className="bar"></span>
                <label htmlFor="password">Enter Password to Transfer</label>
            </div>
           <button>Transfer Ownership</button> 
            
        </>
    )
}

export default TransferOwnership