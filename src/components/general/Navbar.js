import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { UserIcon } from "./UserIcon";
import useWindowDimensions from "./useWindowDimensions"
import "./Navbar.css"

export const Navbar = props => {

    const location = useLocation()
    const user = useContext(UserContext);
    const { width } = useWindowDimensions()

    return (
        // width < 768
        <>
        {width >= 768 ? 
            <ul className="navbar">
                <li className={`nav-link ${location.pathname === "/" && "current-page"}`}>
                    <Link className="nav-redirect" to="/">Home</Link>
                </li>
                <li className={`nav-link ${location.pathname === "/attendance" && "current-page"}`}>
                    <Link className="nav-redirect" to="/attendance">Attendance</Link>
                </li>
                <li className={`nav-link ${location.pathname === "/events" && "current-page"}`}>
                    <Link className="nav-redirect" to="/events">Events</Link>
                </li>
                <li className={`nav-link ${location.pathname === "/calendar" && "current-page"}`}>
                    <Link className="nav-redirect" to="/calendar">Calendar</Link>
                </li>
                {/* <li className={`nav-link ${location.pathname === "/teams" && "current-page"}`}>
                    <Link className="nav-redirect" to="/teams">Teams</Link>
                </li> */}
                <li className="user-icon-container"><UserIcon/></li>
            </ul> :
            <div className="navbar">
                <div className="nav-dropdown">
                    <div className="nav-dropbtn">|||</div>
                    <ul className="nav-dropdown-content">
                        <li className={`nav-dropdown-item ${location.pathname === "/" && "nav-dropdown-current-page"}`}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={`nav-dropdown-item ${location.pathname === "/attendance" && "nav-dropdown-current-page"}`}>
                            <Link to="/attendance">Attendance</Link>
                        </li>
                        <li className={`nav-dropdown-item ${location.pathname === "/events" && "nav-dropdown-current-page"}`}>
                            <Link to="/events">Events</Link>
                        </li>
                        <li className={`nav-dropdown-item ${location.pathname === "/calendar" && "nav-dropdown-current-page"}`}>
                            <Link to="/calendar">Calendar</Link>
                        </li>
                        <li className={`nav-dropdown-item ${location.pathname === "/teams" && "nav-dropdown-current-page"}`}>
                            <Link to="/teams">Teams</Link>
                        </li>
                        <li className={`nav-dropdown-item ${location.pathname === "/bios" && "nav-dropdown-current-page"}`}>
                            <Link to="/bios">Bios</Link>
                        </li>
                        {user.admin && 
                            <li className={`nav-dropdown-item ${location.pathname === "/admins" && "nav-dropdown-current-page"}`}>
                                <Link to="/admins">Admins</Link>
                            </li>
                        }
                    </ul>
                </div>
                <div className="user-icon-container"><UserIcon/></div>
            </div>
        }
        </>
        
    )
}

export default Navbar;