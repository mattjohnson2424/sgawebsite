import "./UserInfo.css"
import useWindowDimensions from "../general/useWindowDimensions"
import UserGridDisplay from "./UserGridDisplay"
import UserRowDisplay from "./UserRowDisplay"

export const UserInfo = ({ tableUser }) => {

    const { width } = useWindowDimensions()

    return (
        <>  
            {width < 1025 ? 
                <UserRowDisplay tableUser={tableUser}/>
            : 
                <UserGridDisplay tableUser={tableUser}/>
            }   
        </>
    )
}

export default UserInfo