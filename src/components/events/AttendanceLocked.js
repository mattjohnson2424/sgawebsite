import { memo } from "react";
import { compareProps } from "../../helpers/memoHelpers";
import "./AttendanceLocked.css"

export const AttendanceLocked = memo(({ locked }) => {
    return (
        <>
            {locked && 
                <div className="attendance-locked">
                    <img className="lock-icon" src="/media/lock-icon.png" alt="lock"/>
                </div>
            }
        </>
        
    )
}, compareProps)

export default AttendanceLocked