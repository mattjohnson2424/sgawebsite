import { useContext, useState } from "react"
import UserContext from "../contexts/UserContext"
import BioList from "../components/about-us/BioList"
import AddBio from "../components/about-us/AddBio"
import BioContext from "../contexts/BioContext"
import LoadingScreen from "../components/general/LoadingScreen"
import MissionStatement from "../components/about-us/MissionStatement"

export const AboutUs = () => {
  
    const user = useContext(UserContext)
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)


    return (
        <>
            <MissionStatement/>
            <BioContext.Provider value={{ showLoadingScreen, setShowLoadingScreen }}>
                <LoadingScreen show={showLoadingScreen}/>
                <h1 style={{ textAlign: "center" }}>Our Team</h1>
                {user.exec && <AddBio/>}
                <BioList/>
            </BioContext.Provider>
        </>
    )
}

export default AboutUs;