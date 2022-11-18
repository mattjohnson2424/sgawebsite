import { useContext, useEffect } from "react";
import AddEvent from "../components/events/AddEvent";
import { EventList } from "../components/events/EventList";
import UserContext from "../contexts/UserContext";
import { refreshEventUsers } from "../helpers/backendHelpers";

export const Events = () => {

    const user = useContext(UserContext)

    useEffect(() => {
        refreshEventUsers()
    }, [])

    return (
        <div>
            <h1>Events</h1>
            <br/>
            {user.admin && <AddEvent/>}
            <EventList/>
        </div>
    )
}

export default Events;