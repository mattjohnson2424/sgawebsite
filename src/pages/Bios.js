import { useContext } from "react"
import UserContext from "../contexts/UserContext"
import BioList from "../components/bios/BioList"
import AddBio from "../components/bios/AddBio"
import "./Bios.css"

export const Bios = () => {
  
    const user = useContext(UserContext)

    return (
        <>
            <h1 className="exec-bios">Executive Bios</h1>
            {user.exec && <AddBio/>}
            <BioList/>
        </>
    )
}

export default Bios;