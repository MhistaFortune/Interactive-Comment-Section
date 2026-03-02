import React, { useState } from 'react';
import type { Comment, User } from '../../types/comment';
import CommentForm from './CommentForm';
import CommentMenu from './CommentMenu';
import ReplyList from '../Reply/ReplyList';
import './CommentItem.css';

interface CommentItemProps {
    comment: Comment;
    currentUser: User;
    onDelete: (id: number) => void;
    onEdit: (id: number, content: string) => void;
    onReply: (id: number, content: string) => void;
    onVote: (id: number, type: 'up' | 'down') => void;
}

const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    currentUser,
    onDelete,
    onEdit,
    onReply,
    onVote,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    const isCurrentUser = comment.user.username === currentUser.username;

    const handleEdit = () => {
        if (editContent.trim()) {
            onEdit(comment.id, editContent);
            setIsEditing(false);
        }
    };

    const handleReply = (content: string) => {
        onReply(comment.id, content);
        setIsReplying(false);
    };

    return (
        <div className="comment-wrapper">
            <div className="comment-item card">
                <div className="vote-control desktop">
                    <button onClick={() => onVote(comment.id, 'up')}>
                        <img src="./images/icon-plus.svg" alt="plus" />
                    </button>
                    <span>{comment.score}</span>
                    <button onClick={() => onVote(comment.id, 'down')}>
                        <img src="./images/icon-minus.svg" alt="minus" />
                    </button>
                </div>

                <div className="comment-content">
                    <div className="comment-header">
                        <div className="user-info">
                            <picture className="user-avatar">
                                <source srcSet={comment.user.image.webp} type="image/webp" />
                                <img src={comment.user.image.png} alt={comment.user.username} />
                            </picture>
                            <span className="username">{comment.user.username}</span>
                            {isCurrentUser && <span className="you-tag">you</span>}
                            <span className="created-at">{comment.createdAt}</span>
                        </div>

                        <div className="comment-header-actions">
                            <button className="btn-reply-action desktop-only" onClick={() => setIsReplying(!isReplying)}>
                                <img src="./images/icon-reply.svg" alt="reply" /> Reply
                            </button>
                            <CommentMenu
                                onDelete={() => onDelete(comment.id)}
                                onEdit={() => setIsEditing(!isEditing)}
                            />
                        </div>
                    </div>

                    <div className="comment-body">
                        {isEditing ? (
                            <div className="edit-mode">
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    rows={4}
                                />
                                <div className="edit-actions">
                                    <button className="btn-update" onClick={handleEdit}>
                                        UPDATE
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p>{comment.content}</p>
                        )}
                    </div>

                    <div className="comment-actions mobile">
                        <div className="vote-control mobile-only">
                            <button onClick={() => onVote(comment.id, 'up')}>
                                <img src="./images/icon-plus.svg" alt="plus" />
                            </button>
                            <span>{comment.score}</span>
                            <button onClick={() => onVote(comment.id, 'down')}>
                                <img src="./images/icon-minus.svg" alt="minus" />
                            </button>
                        </div>
                        <div className="action-buttons">
                            <button className="btn-reply-action" onClick={() => setIsReplying(!isReplying)}>
                                <img src="./images/icon-reply.svg" alt="reply" /> Reply
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isReplying && (
                <CommentForm
                    currentUser={currentUser}
                    onSend={handleReply}
                    buttonText="REPLY"
                    placeholder={`Replying to @${comment.user.username}...`}
                />
            )}

            {comment.replies.length > 0 && (
                <ReplyList
                    replies={comment.replies}
                    currentUser={currentUser}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onReply={onReply}
                    onVote={onVote}
                    parentId={comment.id}
                />
            )}
        </div>
    );
};

export default CommentItem;
