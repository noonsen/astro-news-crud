import React, { useState } from 'react';
import { supabase } from '@/supabase';

type DeleteButtonProps = {
    id: number;
    onDelete: (id: number) => void;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, onDelete }) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        const { error } = await supabase
            .from('news_articles')
            .delete()
            .eq('id', id);

        setIsDeleting(false);
        if (!error) {
            onDelete(id);
            setShowConfirmDialog(false);
        } else {
            console.error('Error deleting article:', error.message);
        }
    };

    const handleCancel = () => {
        setShowConfirmDialog(false);
    };

    return (
        <div>
            <button
                onClick={handleDeleteClick}
                className="inline-flex items-center px-4 py-2 border border-red-600 bg-white hover:bg-red-400 text-black text-sm font-medium rounded-md">
                <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    ></path>
                </svg>
    
                Delete
            
            </button>
            {showConfirmDialog && (
                <div className="fixed z-100 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p className="font-bold">Are you sure you want to delete this article?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleConfirmDelete}
                                className={`bg-red-500 text-white px-4 py-2 rounded ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Confirm'}
                            </button>
                            <button
                                onClick={handleCancel}
                                className="ml-2 bg-gray-300 text-black px-4 py-2 rounded"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteButton;
