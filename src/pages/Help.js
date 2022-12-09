import AddHelp from "../components/help/AddHelp"
import HelpList from "../components/help/HelpList"

export const HelpRequest = () => {

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Help</h1>
            <AddHelp/>
            <HelpList/>
        </>
    )
}

export default HelpRequest