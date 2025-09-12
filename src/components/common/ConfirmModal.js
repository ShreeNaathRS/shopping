import './confirmModal.css'

const ConfirmModal = ({ id, message, onConfirmation }) => {
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`${id}Label`}>{message}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body confirm-button-action">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onConfirmation}>Yes</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ConfirmModal
