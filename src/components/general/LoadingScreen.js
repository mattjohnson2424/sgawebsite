import "./LoadingScreen.css"

export const LoadingScreen = props => {
    return (
        <>
            {props.show && 
                <div className="loading-screen">
                    <div className="loading-icon">loading</div>
                </div>
            }
        </>
        
    )
}

export default LoadingScreen