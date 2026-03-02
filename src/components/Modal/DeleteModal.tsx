import React from 'react';
import './DeleteModal.css';

interface DeleteModalProps {
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onCancel, onConfirm }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content card">
                <h2>Delete comment</h2>
                <p>
                    Are you sure you want to delete this comment? This will remove the
                    comment and can't be undone.
                </p>
                <div className="modal-actions">
                    <button className="btn btn-cancel" onClick={onCancel}>
                        NO, CANCEL
                    </button>
                    <button className="btn btn-delete" onClick={onConfirm}>
                        YES, DELETE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
