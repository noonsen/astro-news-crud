import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/supabase';

const NewsForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [datePublished, setDatePublished] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data, error } = await supabase
                .from('news_articles')
                .upsert([{ title,  description, date_published: datePublished }])
               

            if (error) {
                throw error;
            }

            // Reset form fields
            setTitle('');
            setDescription('');
            setDatePublished('');

            console.log('News added successfully!');
        } catch (error) {
            console.error('Error adding news:', error.message);
            console.log('Failed to add news. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-4 m-10 bg-gray-100 border border-black rounded">
            <div className="container mx-auto p-10">
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
                        <textarea id="newsDescription" name="newsDescription" rows="4" required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            value={description} onChange={(e) => setDescription(e.target.value)}>

                            </textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="datePublished" className="block text-gray-700 font-bold">Date Published:</label>
                        <input type="date" id="datePublished" name="datePublished" required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            value={datePublished} onChange={(e) => setDatePublished(e.target.value)} />
                    </div>
                    <div className="flex gap-4">
                        <Button type="submit" className="bg-green-500 py-2 px-4 border border-black rounded-md hover:bg-green-600 active:transition-transform active:translate-y-1">Upload</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewsForm;
