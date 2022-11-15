import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { UserIcon } from "./UserIcon";
import "./Navbar.css"

export const Navbar = () => {

    const user = useContext(UserContext)

    return (
        <div id="navbar">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/attendance">Attendance</Link>
            <Link className="nav-link" to="/events">Events</Link>
            <Link className="nav-link" to="/calendar">Calendar</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/bios">Bios</Link>
            {user.admin && <Link className="nav-link" to="/admins">Admins</Link>}
            <UserIcon/>
        </div>
    )
}

export default Navbar;