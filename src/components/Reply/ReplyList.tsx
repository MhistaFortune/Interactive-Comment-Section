import React from 'react';
import type { Reply, User } from '../../types/comment';
import ReplyItem from './ReplyItem';
import './ReplyList.css';

interface ReplyListProps {
    replies: Reply[];
    currentUser: User;
    onDelete: (id: number) => void;
    onEdit: (id: number, content: string) => void;
    onReply: (parentId: number, content: string) => void;
    onVote: (id: number, type: 'up' | 'down') => void;
    parentId: number;
}

const ReplyList: React.FC<ReplyListProps> = ({
    replies,
    currentUser,
    onDelete,
    onEdit,
    onReply,
    onVote,
    parentId,
}) => {
    return (
        <div className="reply-list-container">
            <div className="reply-line"></div>
            <div className="reply-items">
                {replies.map((reply) => (
                    <ReplyItem
                        key={reply.id}
                        reply={reply}
                        currentUser={currentUser}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onReply={(content: string) => onReply(parentId, content)}
                        onVote={onVote}
                    />
                ))}
            </div>
        </div>
    );
};

export default ReplyList;
