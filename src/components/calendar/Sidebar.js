import { useContext } from "react"
import CalendarContext from "../../contexts/CalendarContext"
import SmallCalendar from "./SmallCalendar"

export const Sidebar = () => {

    const { setShowEventModal } = useContext(CalendarContext)

    return (
        <aside className="sidebar">
            <button onClick={() => setShowEventModal(true)}>Add Event</button>
            <SmallCalendar/>
        </aside>
    )
}

export default Sidebar