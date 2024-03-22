import React, { useState } from 'react';
import { supabase } from '@/supabase';

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
        }
    };

    const uploadFile = async () => {
        if (!selectedFile) return;

        setUploading(true);

        try {
            const { data, error } = await supabase.storage
                .from('news_images')
                .upload(`/${selectedFile.name}`, selectedFile, {
                    cacheControl: '3600', // Cache control for the file
                });

            if (error) {
                throw error;
            }

            if (data) {
                setUploadSuccess(true);
                setImageUrl(data.Key); // Save the image URL
            }
        } catch (error: any) {
            console.error('Error uploading image:', error.message);
            setUploadError(true);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="">
            <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg">
                <div
                    className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg mb-4"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files.length > 0) {
                            const file = e.dataTransfer.files[0];
                            setSelectedFile(file);
                        }
                    }}
                >
                    <label htmlFor="file-upload" className="flex flex-col items-center space-y-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            {/* Add SVG content here */}
                        </svg>
                        <p className="text-gray-500">Drag & drop your image here</p>
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="py-2 px-4 bg-blue-400 border border-black text-black rounded-md cursor-pointer"
                        >
                            Select Image
                        </label>
                    </label>
                </div>

                {/* Display the selected file name */}
                {selectedFile && (
                    <p className="mt-2 text-gray-700 truncate">Selected file: {selectedFile.name}</p>
                )}

                {/* Button to trigger file upload */}
                <button
                    className={`mt-2 w-full py-2 px-4 ${
                        uploading ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                    } text-black border border-black rounded-md active:transition-transform active:translate-y-1`}
                    onClick={uploadFile}
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload Image to Bucket'}
                </button>

                {/* Display upload success message */}
                {uploadSuccess && (
                    <div className="mt-2 p-2 bg-green-200 text-green-800 rounded flex items-center justify-center">
                        Image uploaded successfully!
                    </div>
                )}

                {/* Display upload error message */}
                {uploadError && (
                    <div className="mt-2 p-2 bg-red-200 text-red-800 rounded">
                        Error uploading image. Please try again.
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadImage;
