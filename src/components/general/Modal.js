import "./Modal.css"

export const Modal = props => {

    return (
        <>
            {props.show && <div className="modal-background">
                <div className="modal-container">
                    <button onClick={props.onClose} className="close-btn"> X </button>
                    {props.children}
                </div>
            </div>}
        </>      
    )
}

export default Modal;