import { useState } from 'react';
import './createHackathon.css';

function CreateHackathon() {
    const [formData, setFormData] = useState({
        name: "",
        theme: "",
        startDate: "",
        deadline: "",
        prize: "",
        picture: null,
        description: "",
        rules: ""
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "file" ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        console.log(formData);
    };

    return (
        <div className="create-hackathon-header">
            <form className="create-hackathon-form">

                <div className="hackathon-form-column">

                    <label>
                        Theme:
                        <input
                            type="text"
                            name="theme"
                            placeholder="Theme of the hackathon"
                            required
                            value={formData.theme}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Start date:
                        <input
                            type="date"
                            name="startDate"
                            required
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Deadline:
                        <input
                            type="date"
                            name="deadline"
                            required
                            value={formData.deadline}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Prize:
                        <input
                            type="text"
                            name="prize"
                            placeholder="Describe the prize(s)"
                            required
                            value={formData.prize}
                            onChange={handleChange}
                        />
                    </label>
                </div>


                <div className="hackathon-form-column">
                    <label>
                        Hackathon Name:
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter hackathon name"
                            required
                            value={formData.name}
                            onChange={handleChange} />
                    </label>
                    <label>
                        Hackathon Picture:
                        <input
                            type="file"
                            name="picture"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            placeholder="Describe the hackathon"
                            rows={4}
                            required
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Rules:
                        <textarea
                            name="rules"
                            placeholder="List the rules"
                            rows={3}
                            required
                            value={formData.rules}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </form>
            <button type="submit" onClick={handleSubmit}>Create Hackathon</button>
        </div>

    );
}

export default CreateHackathon;