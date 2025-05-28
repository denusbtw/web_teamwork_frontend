import Card from "../components/Card";
import Leaderboard from "../components/Leaderboard";
import Topbar from "../components/Topbar";
import { useEffect, useState } from "react";
import Instruction from "../components/HomeComponents/Instruction";
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHackathons();
    }, []);

    async function fetchHackathons() {
        setLoading(true);
        try {
            const response = await fetch('https://web-teamwork-backend.onrender.com/api/v1/hackathons/');
            if (!response.ok) {
                throw new Error('Failed to fetch hackathons');
            }
            const data = await response.json();
            setHackathons(data);
        } catch (error) {
            console.error('Error fetching hackathons:', error);
            setHackathons([]);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Topbar />
            <main>
                <section section className="section-block" >
                    <div className="about-us">
                        <div className="info">
                            <h1>About us</h1>
                            <p> We are a platform that simplifies hackathon participation by providing easy registration and management tools for participants. We handle the technical side of event coordination, making it easier for participants to focus on what matters most - building amazing projects. Whether you're a first-time hackathon participant or a seasoned competitor, our platform streamlines your journey from registration to participation. We connect talented individuals with exciting hackathon opportunities while taking care of all the administrative details.</p>
                            <Link to={`/about-us`}>
                                <button className="more-button">More</button>
                            </Link>
                        </div>
                        <div className="image">
                            <img alt=" " src="https://live.staticflickr.com/124/337160380_f5681cab06_w.jpg"></img>
                        </div>
                    </div >

                </section>
                <section section className="section-block" >
                    <h2 className='home-title'>How it works</h2>
                    <Instruction />
                </section>
                <section section className="section-block" >
                    <h2 className="home-title">Popular Hackathons</h2>
                    <div className="card-grid">
                        {hackathons.slice(0, 3).map((hackathon) => (
                            <Card key={hackathon?.hackathon_ID} hackathon={hackathon} />
                        ))}
                    </div>
                </section>

                < section className="section-block" >
                    <h2 className="home-title">Leaderboard</h2>
                    <Leaderboard searchTerm={""} top={10} />
                </section>
            </main >

        </>
    );
}

export default Home;
