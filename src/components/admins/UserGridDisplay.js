import { useContext } from "react"
import UserContext from "../../contexts/UserContext"
import DeleteUser from "./DeleteUser"
import DemoteUser from "./DemoteUser"
import { EditUser } from "./EditUser"
import PromoteUser from "./PromoteUser"
import "./UserGridDisplay.css"

export const UserGridDisplay = ({ tableUser }) => {

    const user = useContext(UserContext)

    return (
        <>
            <div className="user-grid-info">{tableUser.firstName}</div>
            <div className="user-grid-info">{tableUser.lastName}</div>
            <div className="user-grid-info">{tableUser.grade !== "staff" ? tableUser.grade : "Staff"}</div>
            <div className="user-grid-info">{tableUser.officer ? tableUser.admin ? "Admin" : "Officer" : "Member"}</div>
            <div className="user-grid-info"><button className="btn account-email-btn">Send</button></div>
            <div className="user-grid-info"><EditUser tableUser={tableUser}/></div>
            {user.owner && <>
                <div className="user-grid-info"><PromoteUser tableUser={tableUser}/></div>
                <DemoteUser tableUser={tableUser}/>
            </>}
            <div className="user-grid-info"><DeleteUser user={tableUser}/></div>
        </>
    )
}

export default UserGridDisplay