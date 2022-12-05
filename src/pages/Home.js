import { useContext, useState } from "react"
import UserContext from '../contexts/UserContext'
import AddAnnouncement from "../components/home/AddAnnouncement";
import AnnouncementList from "../components/home/AnnouncementList";
import UserDashboard from "../components/home/UserDashboard";
import WelcomeVideo from "../components/home/WelcomeVideo";
import HomeContext from "../contexts/HomeContext";
import LoadingScreen from "../components/general/LoadingScreen";
import IncomingOwnershipRequest from "../components/home/IncomingOwnershipRequest";

export const Home = () => {

    const user = useContext(UserContext)

    const [showLoadingScreen, setShowLoadingScreen] = useState(false)

    return (
        <HomeContext.Provider value={{ showLoadingScreen, setShowLoadingScreen }}>
            <LoadingScreen show={showLoadingScreen} />
            <WelcomeVideo/>
            {user.admin && <IncomingOwnershipRequest/>}
            <UserDashboard/>
            {user.exec && <AddAnnouncement/>}
            <AnnouncementList/>
        </HomeContext.Provider>
    )
}

export default Home;