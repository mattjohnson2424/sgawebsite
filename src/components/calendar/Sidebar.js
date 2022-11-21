import { useContext } from "react"
import CalendarContext from "../../contexts/CalendarContext"
import SmallCalendar from "./SmallCalendar"
import UserContext from "../../contexts/UserContext"
import { eventTypes, eventTypeColors } from "../../helpers/eventTypes"

export const Sidebar = () => {

    const { setShowEventModal, filteredEventTypes, setFilteredEventTypes } = useContext(CalendarContext)
    const user = useContext(UserContext)

    return (
        <aside className="sidebar">
            {user.admin && <>
                <button onClick={() => setShowEventModal(true)}>Add Event</button>
                <SmallCalendar/>
            </>}
            <h3>Filter</h3>
            {eventTypes.map((event, index) => (
                <div key={index} className="event-filter row" onClick={() => {
                    if(filteredEventTypes.includes(event)) {
                        setFilteredEventTypes(filteredEventTypes.filter(listColor => listColor !== event))
                    } 
                    else {
                        setFilteredEventTypes([...filteredEventTypes, event])
                    }
                }}>
                    <div className={`color-filter-checkbox ${filteredEventTypes.includes(event) && 'color-filter-selected'}`} style={{ 
                        border: `2px solid ${eventTypeColors[index]}`,
                        backgroundColor: `${filteredEventTypes.includes(event) ? eventTypeColors[index] : 'transparent'}`
                    }}
                    >{filteredEventTypes.includes(event) && <p>&#10004;</p>}</div>
                    <p>{`${event[0].toUpperCase()}${event.slice(1)}`}</p>
                </div>
            ))}
            
            
        </aside>
    )
}

export default Sidebar