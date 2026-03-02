import React from 'react';
import type { Comment, User } from '../../types/comment';
import CommentItem from './CommentItem';
import './CommentList.css';

interface CommentListProps {
    comments: Comment[];
    currentUser: User;
    onDelete: (id: number) => void;
    onEdit: (id: number, content: string) => void;
    onReply: (parentId: number, content: string) => void;
    onVote: (id: number, type: 'up' | 'down') => void;
}

const CommentList: React.FC<CommentListProps> = ({
    comments,
    currentUser,
    onDelete,
    onEdit,
    onReply,
    onVote,
}) => {
    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    currentUser={currentUser}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onReply={onReply}
                    onVote={onVote}
                />
            ))}
        </div>
    );
};

export default CommentList;
