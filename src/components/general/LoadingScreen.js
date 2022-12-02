import "./LoadingScreen.css"

export const LoadingScreen = props => {
    return (
        <>
            {props.show && 
                <div className="loading-screen">
                    <div className="spin-container">
                        <div className="spin" id="loader"></div>
                        <div className="spin" id="loader2"></div>
                        <div className="spin" id="loader3"></div>
                        <div className="spin" id="loader4"></div>
                        <span id="text">Loading...</span>
                    </div>
                </div>
            }
        </>
        
    )
}

export default LoadingScreen