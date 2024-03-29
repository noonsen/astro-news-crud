import React, { useState } from 'react';
import { supabase } from '@/supabase';

const CreateNewsForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [datePublished, setDatePublished] = useState('');
    const [body, setBody] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const expiryTime = 5 * 365 * 24 * 60 * 60;

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImageFile(event.target.files[0]);
        }
    };

    async function generateSignedUrl(fileName: string): Promise<string> {
        try {
            const { data, error } = await supabase.storage
                .from('news_images')
                .createSignedUrl(fileName, expiryTime); // 5-yr expiry time (in seconds)
    
            if (error) {
                throw error;
            }
    
            if (data) {
                return data.signedUrl;
            } else {
                throw new Error('Failed to generate signed URL');
            }
        } catch (error) {
            console.error('Error generating signed URL:', error);
            // You can throw the error or return a default value here
            throw error;
        }
    }
    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            let imageURL = '';

            // Upload image to Supabase Storage if an image file is selected
            if (imageFile) {
                const { data: imageData, error: imageError } = await supabase.storage
                    .from('news_images')
                    .upload(`${imageFile.name}`, imageFile, { cacheControl: '3600' });

                if (imageError) {
                    throw imageError;
                }

                if (imageData) {
                    // Construct the URL using the path
                    const signedUrl = await generateSignedUrl(imageData.path);
                    imageURL = signedUrl;
                }
            }

            // Insert news article into the database with signed URLs
            const { error } = await supabase
                .from('news_articles')
                .insert([{ title, description, body, date_published: datePublished, images: imageURL }]);

            if (error) {
                throw error;
            }

            // Reset form fields
            setTitle('');
            setDescription('');
            setBody('');
            setDatePublished('');
            setImageFile(null);

            alert('News article created successfully!');
        } catch (error) {
            console.error('Error creating news article:', error);
            console.error('Failed to create news article. Please try again.', error);
        }
    };

    return (
        <div className="container mx-auto p-4 m-10 bg-gray-100 border border-black rounded">
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-10">
                    <h2 className="text-2xl font-bold mb-4">Create News Article</h2>
                    <form onSubmit={handleSubmit} className="max-w-lg">
                        <div className="mb-4">
                            <label htmlFor="newsTitle" className="block text-gray-700 font-bold">News Title:</label>
                            <input type="text" id="newsTitle" name="newsTitle" required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newsDescription" className="block text-gray-700 font-bold">News Description:</label>
                            <input type="text" id="newsDescription" name="newsDescription" required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newsBody" className="block text-gray-700 font-bold">News Body:</label>
                            <textarea id="newsBody" name="newsBody" rows={4} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="datePublished" className="block text-gray-700 font-bold">Date Published:</label>
                            <input type="date" id="datePublished" name="datePublished" required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                value={datePublished} onChange={(e) => setDatePublished(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newsImage" className="block text-gray-700 font-bold">News Image:</label>
                            <input type="file" id="newsImage" name="newsImage" accept="image/*"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                onChange={handleImageChange} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-green-500 py-2 px-4 border border-black rounded-md hover:bg-green-600 active:transition-transform active:translate-y-1">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateNewsForm;
