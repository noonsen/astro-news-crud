import React from 'react';
import { supabase } from '@/supabase';

type UpdateButtonProps = {
    id: number;
};

const UpdateButton: React.FC<UpdateButtonProps> = ({ id }) => {
    const handleFetchData = async () => {
        try {
            // Fetch data from Supabase
            const { data, error } = await supabase
            .from('news_articles')
            .select('id, title, description, date_published')
            .eq('id', id)
            .single();
            if (error) {
                throw error;
            }

            if (data) {
                console.log('Fetched data:', id);
            } else {
                console.log('No data found.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        
    };


    return (
        <a href="/update">
            <button onClick={() => { handleFetchData(); }} aria-label="UpdateButton" className="bg-blue-400 rounded-lg hover:transition-transform hover:scale-110 active:translate-y-1 border border-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="#110E0E" d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h7.175q.4 0 .763.15t.637.425l4.85 4.85q.275.275.425.638t.15.762V10.4q0 .275-.162.475t-.413.3q-.4.15-.763.388T18 12.1l-5.4 5.4q-.275.275-.437.638T12 18.9V21q0 .425-.288.713T11 22zm8-1v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.2 5.2q-.15.15-.337.225T16.65 22H15q-.425 0-.712-.287T14 21m6.575-4.6l.925-.975l-.925-.925l-.95.95zM14 9h4l-5-5l5 5l-5-5v4q0 .425.288.713T14 9"/>
                    </svg>
                 
            </button>
        </a>

    );
};

export default UpdateButton;