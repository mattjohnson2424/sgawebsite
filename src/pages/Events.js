import { useContext, useState } from "react";
import AddEvent from "../components/events/AddEvent";
import { EventList } from "../components/events/EventList";
import LoadingScreen from "../components/general/LoadingScreen";
import EventsContext from "../contexts/EventsContext";
import UserContext from "../contexts/UserContext";

export const Events = () => {

    const user = useContext(UserContext)
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)

    return (
        <EventsContext.Provider value={{ showLoadingScreen, setShowLoadingScreen }}>
            <LoadingScreen show={showLoadingScreen} />
            <h1 style={{ textAlign: "center" }}>Events</h1>
            {user.admin && <AddEvent/>}
            <EventList/>
        </EventsContext.Provider>
    )
}

export default Events;