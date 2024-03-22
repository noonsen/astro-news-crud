import React, { useState } from 'react';
import { supabase } from '@/supabase';
import UploadImage from '@/components/UploadImage.tsx'


const CreateNewsForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [datePublished, setDatePublished] = useState('');
    const [body, setBody] = useState('');
    const [imageURL, setImageURL] = useState<string>('');

    const handleImageUpload = async (file: File) => {
        try {
            // Upload image to Supabase Storage
            const { data, error } = await supabase.storage
                .from('images')
                .upload(`public/${file.name}`, file, { cacheControl: '3600' });

            if (error) {
                throw error;
            }

            // Get the URL of the uploaded image
            const imageURL = await supabase.storage
                .from('images')
                .createSignedUrl(file.name, 3600);

            setImageURL(imageURL);
        } catch (error: any) {
            console.error('Error uploading image:', error.message);
        }
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();

        try {
            const { data, error } = await supabase
                .from('news_articles')
                .insert([{ title,  description, body, date_published: datePublished, images: imageURL }])
               

            if (error) {
                throw error;
            }

            // Reset form fields
            setTitle('');
            setDescription('');
            setBody('');
            setDatePublished('');
            setImageURL('');

            alert('Article created successfully!');
        } catch (error) {
            console.error('Error adding news:', error);
            console.log('Failed to add news. Please try again.');
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
                        <textarea id="newsBody" name="newsBody" rows="4" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            value={body} onChange={(e) => setBody(e.target.value)}>

                        </textarea>

                    </div>
                    <div className="mb-4">
                        <label htmlFor="datePublished" className="block text-gray-700 font-bold">Date Published:</label>
                        <input type="date" id="datePublished" name="datePublished" required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            value={datePublished} onChange={(e) => setDatePublished(e.target.value)} />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-green-500 py-2 px-4 border border-black rounded-md hover:bg-green-600 active:transition-transform active:translate-y-1">
                            Upload</button>
                    </div>    
                </form>
            </div>
            <div className="w-full md:w-1/2 p-10">
                <h1 className="font-bold flex justify-center p-5">Upload News Article Image:</h1>
                <UploadImage onImageUpload={handleImageUpload} />
            </div>
        </div>
    </div>

    );
};

export default CreateNewsForm;
