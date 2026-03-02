import React, { useState } from 'react';
import type { AppData, Comment, Reply } from './types/comment';
import data from './data/data.json';
import CommentList from './components/Comment/CommentList';
import CommentForm from './components/Comment/CommentForm';
import DeleteModal from './components/Modal/DeleteModal';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

const App: React.FC = () => {
  const [appData, setAppData] = useLocalStorage<AppData>('comment-section-data', data);
  const [deleteModalConfig, setDeleteModalConfig] = useState<{ id: number; isOpen: boolean }>({
    id: 0,
    isOpen: false,
  });

  const currentUser = appData.currentUser;

  // --- CRUD Operations ---

  const handleAddComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      content,
      createdAt: 'Just now',
      score: 0,
      user: currentUser,
      replies: [],
    };
    setAppData({
      ...appData,
      comments: [...appData.comments, newComment],
    });
  };

  const handleAddReply = (parentId: number, content: string) => {
    const newReply: Reply = {
      id: Date.now(),
      content,
      createdAt: 'Just now',
      score: 0,
      replyingTo: '', // Will be set below
      user: currentUser,
    };

    const updatedComments = appData.comments.map((comment) => {
      if (comment.id === parentId) {
        newReply.replyingTo = comment.user.username;
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      // Check if replying to another reply
      const replyIndex = comment.replies.findIndex((r) => r.id === parentId);
      if (replyIndex !== -1) {
        newReply.replyingTo = comment.replies[replyIndex].user.username;
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      return comment;
    });

    setAppData({ ...appData, comments: updatedComments });
  };

  const handleEdit = (id: number, content: string) => {
    const updatedComments = appData.comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, content };
      }
      const updatedReplies = comment.replies.map((reply) =>
        reply.id === id ? { ...reply, content } : reply
      );
      return { ...comment, replies: updatedReplies };
    });
    setAppData({ ...appData, comments: updatedComments });
  };

  const handleDelete = () => {
    const id = deleteModalConfig.id;
    const updatedComments = appData.comments
      .filter((comment) => comment.id !== id)
      .map((comment) => ({
        ...comment,
        replies: comment.replies.filter((reply) => reply.id !== id),
      }));
    setAppData({ ...appData, comments: updatedComments });
    setDeleteModalConfig({ id: 0, isOpen: false });
  };

  const handleVote = (id: number, type: 'up' | 'down') => {
    const updatedComments = appData.comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, score: comment.score + (type === 'up' ? 1 : -1) };
      }
      const updatedReplies = comment.replies.map((reply) =>
        reply.id === id
          ? { ...reply, score: reply.score + (type === 'up' ? 1 : -1) }
          : reply
      );
      return { ...comment, replies: updatedReplies };
    });
    setAppData({ ...appData, comments: updatedComments });
  };

  const openDeleteModal = (id: number) => {
    setDeleteModalConfig({ id, isOpen: true });
  };

  const closeDeleteModal = () => {
    setDeleteModalConfig({ id: 0, isOpen: false });
  };

  // Sort comments by score
  const sortedComments = [...appData.comments].sort((a, b) => b.score - a.score);

  return (
    <main className="app-container">
      <CommentList
        comments={sortedComments}
        currentUser={currentUser}
        onDelete={openDeleteModal}
        onEdit={handleEdit}
        onReply={handleAddReply}
        onVote={handleVote}
      />
      <CommentForm currentUser={currentUser} onSend={handleAddComment} />

      {deleteModalConfig.isOpen && (
        <DeleteModal onCancel={closeDeleteModal} onConfirm={handleDelete} />
      )}
    </main>
  );
};

export default App;
