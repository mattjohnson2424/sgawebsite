import { useContext } from "react";
import { Link } from "react-router-dom";
import AddEvent from "../components/events/AddEvent";
import { EventList } from "../components/events/EventList";
import Navbar from "../components/general/Navbar";
import UserContext from "../contexts/UserContext";

export const Events = () => {

    const user = useContext(UserContext)

    return (
        <div>
            <Navbar/>
            <h1>Events</h1>
            <Link to="/">Back to home</Link>
            <br/>
            {user.admin && <AddEvent/>}
            <EventList/>
        </div>
    )
}

export default Events;