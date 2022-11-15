import { useContext } from "react"
import UserContext from "../contexts/UserContext"
import BioList from "../components/bios/BioList"
import AddBio from "../components/bios/AddBio"

export const Bios = () => {
  
    const user = useContext(UserContext)

    return (
        <>
            <h1>Exec Bios</h1>
            <br/>
            {user.admin && <AddBio/>}
            <BioList/>
            
        </>
    )
}

export default Bios;