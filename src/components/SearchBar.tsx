import React, { useState } from 'react';

type SearchProps = {
    onSearch: (query: string) => void; // Callback function to handle search
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query);
    };

    

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={handleChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;
