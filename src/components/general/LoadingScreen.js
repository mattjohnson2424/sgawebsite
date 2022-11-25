import "./LoadingScreen.css"

export const LoadingScreen = props => {
    return (
        <>
            {props.show && 
                <div className="loading-screen">
                    <img className="loading-icon" src="/media/blue-loading-icon.png" alt="loading icon"/>
                </div>
            }
        </>
        
    )
}

export default LoadingScreen