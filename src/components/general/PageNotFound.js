import { Link } from "react-router-dom"
import "./PageNotFound.css"

export const PageNotFound = () => {

    return (
        <>
            <div className="blue-block"></div>
            <div className="other-block"></div>
            <div className="page-not-found-container">
                <div className="page-not-found">
                    <h1>404 Not Found</h1>
                    <p>The page you requested could not be found</p>
                    <Link to="/"><button className="btn back-to-home">Back to Home</button></Link>
                </div>
            </div>
            
        </>
    )
}

export default PageNotFound