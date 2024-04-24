import { supabase } from '@/supabase';
import React, { useState } from 'react';

// Props for the DeleteButton component
type DeleteButtonProps = {
    id: number; // ID of the news article to be deleted
};

// Functional component for the DeleteButton
const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
    const [showDialog, setShowDialog] = useState(false);
    // Function to handle the deletion of a news article
    const handleFetchData = async () => {
        try {
            // Fetch data from Supabase and delete the news article with the specified ID
            const { data, error } = await supabase
                .from('news_articles')
                .delete()
                .eq('id', id)
                .single();
            if (error) {
                throw error;
            }

            // If data is null, the deletion was successful
            if (data) {
                console.log('Data errors');
            } else {
                console.log('Deleted data id:', id);
                alert("Deleted Article Successfully!")
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Render the delete button with an icon
    return (
        <>
            <button onClick={() => setShowDialog(true)} aria-label="DeleteButton" 
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
            {/* Delete Dialog */}
            {showDialog && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <p>Are you sure you want to delete this article?</p>
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setShowDialog(false)} className="p-1 mr-4 text-gray-700 border border-black bg-white rounded-md ">Cancel</button>
                            <button onClick={handleFetchData} className="p-1 text-red-600 border border-red-500 rounded-md hover:bg-red-400 hover:text-black">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default DeleteButton;
