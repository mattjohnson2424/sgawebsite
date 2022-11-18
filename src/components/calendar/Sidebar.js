import CreateEvent from "./CreateEvent"
import SmallCalendar from "./SmallCalendar"

export const Sidebar = () => {
    return (
        <aside className="sidebar">
            <CreateEvent/>
            <SmallCalendar/>
        </aside>
    )
}

export default Sidebar