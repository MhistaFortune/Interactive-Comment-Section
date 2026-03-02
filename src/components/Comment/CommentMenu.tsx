import React, { useState, useRef, useEffect } from 'react';
import './CommentMenu.css';

interface CommentMenuProps {
    onDelete: () => void;
    onEdit: () => void;
}

const CommentMenu: React.FC<CommentMenuProps> = ({ onDelete, onEdit }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="comment-menu-container" ref={menuRef}>
            <button
                className="btn-menu-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Comment options"
            >
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </button>

            {isOpen && (
                <div className="menu-dropdown card">
                    <button className="menu-item btn-delete-action" onClick={() => { onDelete(); setIsOpen(false); }}>
                        <img src="./images/icon-delete.svg" alt="" />
                        Delete
                    </button>
                    <button className="menu-item btn-edit-action" onClick={() => { onEdit(); setIsOpen(false); }}>
                        <img src="./images/icon-edit.svg" alt="" />
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentMenu;
