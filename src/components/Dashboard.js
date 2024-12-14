import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SkillSearch from './SkillSearch';
function Dashboard() {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ skill_id: '', details: '' });

    useEffect(() => {
        const fetchSkills = async () => {
            const response = await axios.get('http://localhost:5000/skills');
            setSkills(response.data);
        };
        fetchSkills();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/exchanges', formData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        alert(response.data.message);
    };

    return (
        <div>
            <h1>Available Skills</h1>
            <ul>
                {skills.map(skill => (
                    <li key={skill.id}>{skill.name}</li>
                ))}
            </ul>
            <h2>Request a Skill Exchange</h2>
            <form onSubmit={handleSubmit}>
                <select onChange={(e) => setFormData({ ...formData, skill_id: e.target.value })}>
                <option>Select Skill</option>
                    {skills.map(skill => (
                        <option value={skill.id} key={skill.id}>{skill.name}</option>
                    ))}
                </select>
                <textarea
                placeholder="Details about the exchange"
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                />
                <button type="submit">Submit</button>
            </form>
            <SkillSearch />
        </div>
    );
}

export default Dashboard;
