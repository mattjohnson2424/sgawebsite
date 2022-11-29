import { useContext } from "react"
import EventContext from "../../contexts/EventContext"

export const EventBody = () => {

    const event = useContext(EventContext)

    return (
        <>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            {event.eventType === "meeting" && <p>Meeting on {event.formattedDate}</p>}
            {event.eventType === "service-project" && <p>Service Project on {event.formattedDate}</p>}
            {event.eventType === "other" && <p>Other Event on {event.formattedDate}</p>}
        </>
    )
}

export default EventBody