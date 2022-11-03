import { Link } from "react-router-dom";
import { UserIcon } from "./UserIcon";

export const Navbar = () => {
    return (
        <div id="navbar">
            <Link className="nav-link" to="/attendance">attendance</Link>
            <Link className="nav-link" to="/events">events</Link>
            <Link className="nav-link" to="/calendar">Calendar</Link>
            <Link className="nav-link" to="/teams">teams</Link>
            <Link className="nav-link" to="/socials">social media</Link>
            <Link className="nav-link" to="/bios">Bios</Link>
            <UserIcon/>
        </div>
    )
}

export default Navbar;