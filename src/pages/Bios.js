import { useContext, useState } from "react"
import UserContext from "../contexts/UserContext"
import BioList from "../components/bios/BioList"
import AddBio from "../components/bios/AddBio"
import BioContext from "../contexts/BioContext"
import LoadingScreen from "../components/general/LoadingScreen"

export const Bios = () => {
  
    const user = useContext(UserContext)
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)


    return (
        <BioContext.Provider value={{ showLoadingScreen, setShowLoadingScreen }}>
            <LoadingScreen show={showLoadingScreen}/>
            <h1 style={{ textAlign: "center" }}>Executive Bios</h1>
            {user.exec && <AddBio/>}
            <BioList/>
        </BioContext.Provider>
    )
}

export default Bios;