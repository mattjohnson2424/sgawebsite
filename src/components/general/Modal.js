import "./Modal.css"

export const Modal = props => {

    return (
        <>
            {props.show && <div className="modal-background">
                <div className={`modal-container ${props.className}`}>
                    <button onClick={props.onClose} className="close-btn"> X </button>
                    <div className="modal-body">
                        {props.children}
                    </div>
                </div>
            </div>}
        </>      
    )
}

export default Modal;