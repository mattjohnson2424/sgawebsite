import "./LoadingScreen.css"

export const LoadingScreen = props => {
    return (
        <>
            {props.show && 
                <div className="loading-screen">
                    <div class="spin-container">
                        <div class="spin" id="loader"></div>
                        <div class="spin" id="loader2"></div>
                        <div class="spin" id="loader3"></div>
                        <div class="spin" id="loader4"></div>
                        <span id="text">Loading...</span>
                    </div>
                </div>
            }
        </>
        
    )
}

export default LoadingScreen