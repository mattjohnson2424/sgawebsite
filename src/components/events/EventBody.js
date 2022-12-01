import { memo } from "react"
import { compareProps } from "../../helpers/memoHelpers"

export const EventBody = memo(({ name, description, eventType, formattedDate }) => {

    return (
        <>
            <h2>{name}</h2>
            <p>{description}</p>
            {eventType === "meeting" && <p>Meeting on {formattedDate}</p>}
            {eventType === "service-project" && <p>Service Project on {formattedDate}</p>}
            {eventType === "schoolwide" && <p>Schoolwide Event on {formattedDate}</p>}
            {eventType === "other" && <p>Miscallaneous Event on {formattedDate}</p>}
        </>
    )
}, compareProps)

export default EventBody