import React, { useState } from 'react';
import axios from 'axios';

function SkillSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await axios.get(`http://localhost:5000/skills/search?q=${query}`);
        setResults(response.data);
    };

    return (
        <div>
            <h3>Search Skills</h3>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for skills..."
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
}

export default SkillSearch;
