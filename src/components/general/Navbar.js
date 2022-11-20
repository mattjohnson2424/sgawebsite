import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { UserIcon } from "./UserIcon";
import "./Navbar.css"

export const Navbar = props => {

    const location = useLocation()
    const user = useContext(UserContext);

    return (
        <div id="navbar">
            <Link className={`nav-link ${location.pathname === "/" && "current-page"}`} to="/">Home</Link>
            <Link className={`nav-link ${location.pathname === "/attendance" && "current-page"}`} to="/attendance">Attendance</Link>
            <Link className={`nav-link ${location.pathname === "/events" && "current-page"}`} to="/events">Events</Link>
            <Link className={`nav-link ${location.pathname === "/calendar" && "current-page"}`} to="/calendar">Calendar</Link>
            <Link className={`nav-link ${location.pathname === "/teams" && "current-page"}`} to="/teams">Teams</Link>
            <Link className={`nav-link ${location.pathname === "/bios" && "current-page"}`} to="/bios">Bios</Link>
            {user.admin && <Link className={`nav-link ${location.pathname === "/admins" && "current-page"}`} to="/admins">Admins</Link>}
            <UserIcon/>
        </div>
    )
}

export default Navbar;