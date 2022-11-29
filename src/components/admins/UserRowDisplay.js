import { useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"
import DeleteUser from "./DeleteUser"
import DemoteUser from "./DemoteUser"
import { EditUser } from "./EditUser"
import PromoteUser from "./PromoteUser"
import "./UserRowDisplay.css"

export const UserRowDisplay = ({ tableUser }) => {

    const user = useContext(UserContext)
    const [show, setShow] = useState(false)

    return (
        <div className="user-row-info-container">
            <div className="show-hide-user-row-info" style={!show ? { borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" } : {}} onClick={() => setShow(!show)}>{tableUser.firstName} {tableUser.lastName}, {tableUser.grade !== "staff" ? `Grade ${tableUser.grade}` : "Staff"}{tableUser.officer ? tableUser.admin ? ", Admin" : ", Officer" : ""}</div>
            {show &&
                <>
                    <div className="separating-line admin-separator"></div>
                    <div className={user.owner ? "user-row-info-owner-content" : "user-row-info-content"}>
                        
                        <h3 className="user-row-info user-row-info-title">Email User</h3>
                        <h3 className="user-row-info user-row-info-title">Edit User</h3>

                        {user.owner && <>
                            <h3 className="user-row-info user-row-info-title">Promote</h3>
                            <h3 className="user-row-info user-row-info-title">Demote</h3>
                        </>}

                        
                        <h3 className="user-row-info user-row-info-title">Delete User</h3>
                        
                        <div className="user-row-info"><button className="btn account-email-btn">Send</button></div>
                        <div className="user-row-info"><EditUser tableUser={tableUser}/></div>
                        {user.owner && <>
                            <PromoteUser tableUser={tableUser}/>
                            <DemoteUser tableUser={tableUser}/>
                        </>} 
                        <div className="user-row-info"><DeleteUser user={tableUser}/></div>
                    </div>
                </>
            }
        </div>
    )
}

export default UserRowDisplay