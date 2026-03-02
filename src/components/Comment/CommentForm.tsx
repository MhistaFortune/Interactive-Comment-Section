import React, { useState } from 'react';
import type { User } from '../../types/comment';
import './CommentForm.css';

interface CommentFormProps {
    currentUser: User;
    onSend: (content: string) => void;
    buttonText?: string;
    initialValue?: string;
    placeholder?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
    currentUser,
    onSend,
    buttonText = 'SEND',
    initialValue = '',
    placeholder = 'Add a comment...',
}) => {
    const [content, setContent] = useState(initialValue);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim()) {
            onSend(content);
            setContent('');
        }
    };

    return (
        <div className="comment-form-container card">
            <form onSubmit={handleSubmit} className="comment-form">
                <picture className="user-avatar-desktop">
                    <source srcSet={currentUser.image.webp} type="image/webp" />
                    <img src={currentUser.image.png} alt={currentUser.username} />
                </picture>
                <textarea
                    placeholder={placeholder}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    required
                />
                <div className="form-footer">
                    <picture className="user-avatar-mobile">
                        <source srcSet={currentUser.image.webp} type="image/webp" />
                        <img src={currentUser.image.png} alt={currentUser.username} />
                    </picture>
                    <button type="submit" className="btn-send">
                        {buttonText}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentForm;
