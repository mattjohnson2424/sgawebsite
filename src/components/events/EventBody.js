import { useContext } from "react"
import EventContext from "../../contexts/EventContext"

export const EventBody = () => {

    const event = useContext(EventContext)

    return (
        <>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            {event.eventType === "meeting" && <p>Meeting on {event.date} at {event.time}</p>}
            {event.eventType === "service-project" && <p>Service Project on {event.date} at {event.time}</p>}
            {event.eventType === "other" && <p>Other Event on {event.date} at {event.time}</p>}
        </>
    )
}

export default EventBody