import { useContext } from "react";
import AddEvent from "../components/events/AddEvent";
import { EventList } from "../components/events/EventList";
import UserContext from "../contexts/UserContext";

export const Events = () => {

    const user = useContext(UserContext)

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Events</h1>
            <br/>
            {user.admin && <AddEvent/>}
            <EventList/>
        </div>
    )
}

export default Events;