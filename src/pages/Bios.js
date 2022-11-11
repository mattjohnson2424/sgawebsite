import { useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import BioList from "../components/bios/BioList"
import AddBio from "../components/bios/AddBio"
import Navbar from "../components/general/Navbar"

export const Bios = () => {
  
    const user = useContext(UserContext)

    return (
        <>
            <Navbar/>
            <h1>Exec Bios</h1>
            <Link to="/">Back to home</Link>
            <br/>
            {user.admin && <AddBio/>}
            <BioList/>
            
        </>
    )
}

export default Bios;