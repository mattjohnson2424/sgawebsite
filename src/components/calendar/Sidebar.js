import { useContext } from "react"
import CalendarContext from "../../contexts/CalendarContext"
import SmallCalendar from "./SmallCalendar"
import UserContext from "../../contexts/UserContext"
import { eventTypes, eventTypeColors } from "../../helpers/eventTypes"
import "./Sidebar.css"

export const Sidebar = () => {

    const { setShowEventModal, filteredEventTypes, setFilteredEventTypes, filterExecOnly, setFilterExecOnly } = useContext(CalendarContext)
    const user = useContext(UserContext)

    return (
        <aside className="sidebar">
            {user.admin && <>
                <button className="btn add-calendar-event" onClick={() => setShowEventModal(true)}>Add Event</button>
                <SmallCalendar/>
            </>}
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

            {user.exec && 
                <div className="event-filter row" onClick={() => {
                    setFilterExecOnly(!filterExecOnly) 
                }}>
                    <div className={`color-filter-checkbox ${filteredEventTypes.includes("exec-only") && 'color-filter-selected'}`} style={{ 
                        border: `2px solid purple`,
                        backgroundColor: `${filterExecOnly ? "purple" : 'transparent'}`
                    }}
                    >{filterExecOnly && <p>&#10004;</p>}</div>
                    <p>Exec Only</p>
                </div>
            }
            
            
        </aside>
    )
}

export default Sidebar