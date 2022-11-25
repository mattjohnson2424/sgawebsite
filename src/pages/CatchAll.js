import { useEffect } from "react"

export const CatchAll = () => {

    useEffect(() => {
        window.location.href = "/"
    }, [])

    return (<></>)
}

export default CatchAll