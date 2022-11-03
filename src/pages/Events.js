import { Link } from "react-router-dom";
import AddEvent from "../components/events/AddEvent";
import { EventList } from "../components/events/EventList";
import Navbar from "../components/home/Navbar";

export const Events = () => {

    return (
        <div>
            <Navbar/>
            <h1>Events</h1>
            <Link to="/">Back to home</Link>
            <AddEvent/>
            <EventList/>
        </div>
    )
}

export default Events;