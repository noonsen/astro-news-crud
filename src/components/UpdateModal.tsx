import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';

type UpdateModalProps = {
    id: number; // Assuming id is required to fetch data
};

const UpdateModal: React.FC<UpdateModalProps> = ({ id }) => {
    const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [datePublished, setDatePublished] = useState('');
    const [newsId, setNewsId] = useState<number | null>(null); // State to hold the fetched ID

    useEffect(() => {
        if (showModal) {
            fetchNewsData();
        }
    }, [showModal]);

    const fetchNewsData = async () => {
        try {
            const { data, error } = await supabase
                .from('news_articles')
                .select('id, title, description, body, date_published')
                .eq('id', id)
                .single();

            if (error) {
                throw error;
            }

            if (data) {
                console.log('Fetched data:', data.id);
                setNewsId(data.id); // Set the fetched ID
                setTitle(data.title);
                setDescription(data.description);
                setDatePublished(data.date_published);
                setBody(data.body);
            }
        } catch (error) {
            console.error('Error fetching news data:', error);
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
        setSelectedItemId(id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItemId(null);
        setIsModalOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateNews();
            handleCloseModal();
            alert('News updated successfully!');
        } catch (error) {
            console.error('Error updating news:', error);
            alert('Failed to update news. Please try again.');
        }
    };

    const updateNews = async () => {
        const { error } = await supabase
            .from('news_articles')
            .update({
                title,
                description,
                body,
                date_published: datePublished
            })
            .eq('id', id);
            console.log(id)

        if (error) {
            throw error;
        }
    };


    return (
        <>
            <button onClick={handleOpenModal} className="bg-white border border-blue-500 hover:bg-blue-300 relative inline-flex items-center justify-center gap-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  h-9 rounded-md px-3 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="gap-2" width="20" height="20" viewBox="0 0 24 24">
                <path fill="#070606" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"/>
                    </svg>
                    Update
              </button>
            {showModal && (
              
                <div className="fixed top-0 left-0 z-50 h-screen w-full flex justify-center items-center backdrop-filter backdrop-blur-sm">
                    <div className="bg-gray-100 p-5 w-10/12 active:bg-blur rounded-lg shadow-lg border border-black ">
                        <h2 className="text-2xl font-bold mb-4 flex ">Update News Article</h2>
                        <div>ID: {newsId}</div> {/* Display the ID */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col">
                                <label htmlFor="title" className="font-bold">Title</label>
                                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="description" className="font-bold">Description</label>
                                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded-md p-2" />
                            </div>

                            <div className="flex flex-col">
                              <label htmlFor="body" className="font-bold">Body</label>
                              <textarea id="newsBody" name="newsBody" rows={4} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                              value={body} onChange={(e) => setBody(e.target.value)}>
                              </textarea>
                            </div>
                            
                            <div className="flex flex-col">
                                <label htmlFor="datePublished" className="font-bold">Date Published</label>
                                <input type="date" id="datePublished" value={datePublished} onChange={(e) => setDatePublished(e.target.value)} className="border border-gray-300 rounded-md p-2" />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                                    <path fill="#070606" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"/>
                                  </svg>
                                    Update
                                  </button>
                                <button type="button" onClick={handleCloseModal} className="bg-red-400 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-red-500">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateModal;
