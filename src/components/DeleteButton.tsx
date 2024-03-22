import {supabase} from '@/supabase';


type DeleteButtonProps = {
    id: number;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
    const handleFetchData = async () => {
        try {
            // Fetch data from Supabase
            const { data, error } = await supabase
            .from('news_articles')
            .delete()
            .eq('id', id)
            .single();
            if (error) {
                throw error;
            }

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

    return (
        <button onClick={() => { handleFetchData(); }} aria-label="UpdateButton" className="bg-red-400 rounded-lg hover:transition-transform hover:scale-110 active:translate-y-1 border ">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="#1D1C1C" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/>
            </svg>
        </button>
    );
};

export default DeleteButton;