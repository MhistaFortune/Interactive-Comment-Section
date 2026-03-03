import React, { useState } from 'react';
import type { Reply, User } from '../../types/comment';
import CommentForm from '../Comment/CommentForm';
import CommentMenu from '../Comment/CommentMenu';
import '../Comment/CommentItem.css'; // Reusing styles

interface ReplyItemProps {
    reply: Reply;
    currentUser: User;
    onDelete: (id: number) => void;
    onEdit: (id: number, content: string) => void;
    onReply: (content: string) => void;
    onVote: (id: number, type: 'up' | 'down') => void;
}

const ReplyItem: React.FC<ReplyItemProps> = ({
    reply,
    currentUser,
    onDelete,
    onEdit,
    onReply,
    onVote,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [editContent, setEditContent] = useState(reply.content);

    const isCurrentUser = reply.user.username === currentUser.username;

    const handleEdit = () => {
        if (editContent.trim()) {
            onEdit(reply.id, editContent);
            setIsEditing(false);
        }
    };

    const handleReplyInternal = (content: string) => {
        onReply(content);
        setIsReplying(false);
    };

    return (
        <div className="comment-wrapper">
            <div className="comment-item card">
                <div className="vote-control desktop">
                    <button onClick={() => onVote(reply.id, 'up')}>
                        <img src="/images/icon-plus.svg" alt="plus" />
                    </button>
                    <span>{reply.score}</span>
                    <button onClick={() => onVote(reply.id, 'down')}>
                        <img src="/images/icon-minus.svg" alt="minus" />
                    </button>
                </div>

                <div className="comment-content">
                    <div className="comment-header">
                        <div className="user-info">
                            <picture className="user-avatar">
                                <source srcSet={reply.user.image.webp} type="image/webp" />
                                <img src={reply.user.image.png} alt={reply.user.username} />
                            </picture>
                            <span className="username">{reply.user.username}</span>
                            {isCurrentUser && <span className="you-tag">you</span>}
                            <span className="created-at">{reply.createdAt}</span>
                        </div>

                        <div className="comment-header-actions">
                            <button className="btn-reply-action desktop-only" onClick={() => setIsReplying(!isReplying)}>
                                <img src="/images/icon-reply.svg" alt="reply" /> Reply
                            </button>
                            <CommentMenu
                                onDelete={() => onDelete(reply.id)}
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
                            <p>
                                <span className="replying-to">@{reply.replyingTo}</span> {reply.content}
                            </p>
                        )}
                    </div>

                    <div className="comment-actions mobile">
                        <div className="vote-control mobile-only">
                            <button onClick={() => onVote(reply.id, 'up')}>
                                <img src="/images/icon-plus.svg" alt="plus" />
                            </button>
                            <span>{reply.score}</span>
                            <button onClick={() => onVote(reply.id, 'down')}>
                                <img src="/images/icon-minus.svg" alt="minus" />
                            </button>
                        </div>
                        <div className="action-buttons">
                            <button className="btn-reply-action" onClick={() => setIsReplying(!isReplying)}>
                                <img src="/images/icon-reply.svg" alt="reply" /> Reply
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isReplying && (
                <CommentForm
                    currentUser={currentUser}
                    onSend={handleReplyInternal}
                    buttonText="REPLY"
                    placeholder={`Replying to @${reply.user.username}...`}
                />
            )}
        </div>
    );
};

export default ReplyItem;
