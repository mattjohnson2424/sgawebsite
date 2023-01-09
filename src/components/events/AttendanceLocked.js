import { memo } from "react";
import { compareProps } from "../../helpers/memoHelpers";
import "./AttendanceLocked.css"

export const AttendanceLocked = memo(({ locked }) => {
    return (
        <>
            {locked && 
                <div className="attendance-locked">
                    <img className="lock-icon" src="https://firebasestorage.googleapis.com/v0/b/elcastudentgovernment.appspot.com/o/media%2Flock.png?alt=media&token=d576fb31-f880-4ab2-b0e6-f32d93724680" alt="lock"/>
                </div>
            }
        </>
        
    )
}, compareProps)

export default AttendanceLocked