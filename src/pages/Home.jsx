import Card from "../components/Card";
import Leaderboard from "../components/Leaderboard";
import Topbar from "../components/Topbar";
import {useEffect, useState} from "react";

function Home() {
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHackathons();
    }, []);

    async function fetchHackathons() {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/v1/hackathons/');
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
            <section className="about-us">
                <div className="info">
                    <h1>About us</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, dolorum. Minus nostrum, deleniti harum
                        provident similique tempore non eum exercitationem, eaque accusantium itaque nam quae in aliquam quia facilis
                        molestias.</p>
                </div>
                <div className="image">
                    <img alt=" " src="https://live.staticflickr.com/124/337160380_f5681cab06_w.jpg" />
                </div>
            </section>
            <h2>Popular Hackathons</h2>
            <div className="card-grid">
                {hackathons.slice(0, 3).map((hackathon) => (
                    <Card key={hackathon.id} hackathon={hackathon} />
                ))}
            </div>
            <h2>Leaderboard</h2>
            <Leaderboard />
        </>
    );
}

export default Home;
