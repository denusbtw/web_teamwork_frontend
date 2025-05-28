import {useParams} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import Topbar from "../components/Topbar";
import '../style/hackathon.css';
import '../style/general.css';
import displayBanner from '../components/NotificationBanner';
import {UserContext} from "../UserContext";

function HackathonDetails() {
    const { user } = useContext(UserContext);
    const { id } = useParams();

    const [hackathon, setHackathon] = useState(null);
    const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

    useEffect(() => {
        async function fetchHackathon() {
            try {
                const response = await fetch(`https://web-teamwork-backend.onrender.com/api/v1/hackathons/${id}/`);
                if (!response.ok) throw new Error("Failed to fetch hackathon");

                const data = await response.json();
                setHackathon(data);
                startCountdown(data.start_datetime, setCountdown);
            } catch (error) {
                alert("Error fetching hackathon data:", error);
            }
        }

        fetchHackathon();
    }, [id]);

    const handleJoinClick = () => joinHackathon(hackathon, user);

    async function joinHackathon(hackathon, user) {
        const button = document.getElementById('join-button');

        if (!user) {
            displayBanner('Please, log in to join the hackathon!');
            button.innerHTML = 'Please, log in';
            button.disabled = true;
            return;
        }

        try {
            button.innerHTML = 'Joining...';
            button.disabled = true;

            const response = await fetch(`https://web-teamwork-backend.onrender.com/api/v1/hackathons/${hackathon.id}/participants/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`
                },
                body: JSON.stringify({ user: user.id })
            });

            if (!response.ok) {
                const errorData = await response.json();
                displayBanner(errorData.detail || 'Failed to join the hackathon.');
                button.innerHTML = 'Try again';
                button.disabled = false;
                return;
            }

            displayBanner('You have successfully joined the hackathon!');
            button.innerHTML = 'Joined';
            button.style.background = "rgb(103, 135, 152)";
            button.style.cursor = "default";
        } catch (error) {
            console.error('Error joining hackathon:', error);
            displayBanner('Something went wrong. Please try again later.');
            button.innerHTML = 'Retry';
            button.disabled = false;
        }
    }

    if (!hackathon) return <h2>Loading...</h2>;

    const formattedDeadline = new Date(hackathon.end_datetime).toLocaleString("uk-UA");

    return (
        <>
            <Topbar />
            <main>
                <div className="preview">
                    <div className="left-side">
                        <div className="image-container">
                            <img className="hackathon-image" src={hackathon.image} alt="hackathon" />
                        </div>
                        <h1 className="title">{hackathon.title}</h1>

                        <div className="countdown-box">
                            <div className="countdown"><h3>{countdown.days}</h3><p>Days</p></div>
                            <div className="countdown"><h3>{countdown.hours}</h3><p>Hours</p></div>
                            <div className="countdown"><h3>{countdown.minutes}</h3><p>Minutes</p></div>
                            <div className="countdown"><h3>{countdown.seconds}</h3><p>Seconds</p></div>
                        </div>

                        <button className="join-button" id="join-button" onClick={handleJoinClick}>Join hackathon</button>
                    </div>

                    <div className="right-side">
                        <p className="deadline">Deadline<br />{formattedDeadline}</p>
                        <hr />
                        {/* Можна додати location, якщо є */}
                        <p className="prize">{hackathon.prize}</p>
                        <hr />
                        <p className="theme">{hackathon.category?.title}</p>
                    </div>
                </div>

                <section className="second-section">
                    <p className="description">{hackathon.description}</p>
                    <hr />
                    <p className="rules">{hackathon.rules}</p>
                </section>

                <div className='banner' id='banner'></div>
            </main>
        </>
    );
}

//  обробляти на бекенді
function change(hackathon, user) {
    const button = document.getElementById('join-button');
    let joinedHackathons = JSON.parse(localStorage.getItem('joinedHackathons')) || [];
    const alreadyJoined = joinedHackathons.some(h => h.id === hackathon.id);

    if (!user) {
        displayBanner('Please, log in to join the hackathon!');
        button.innerHTML = 'Please, log in';
        button.disabled = true;
        return;
    } else if (alreadyJoined) {
        displayBanner('You have already joined this hackathon!');
        button.innerHTML = 'You are already in line';
        button.disabled = true;
        return;
    } else {
        button.innerHTML = 'Please, wait';
        button.style.background = "rgb(103, 152, 151)";
        setTimeout(() => {
            button.innerHTML = 'Look in profile';
            button.style.background = "rgb(103, 135, 152)";
            button.disabled = true;
            button.style.cursor = "default";
        }, 780);
        joinedHackathons.push(hackathon);
        localStorage.setItem('joinedHackathons', JSON.stringify(joinedHackathons));
    }
}

function startCountdown(isoString, setCountdown) {
    const targetDate = new Date(isoString);

    const interval = setInterval(() => {
        const now = new Date();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        }
    }, 1000);
}

export default HackathonDetails;
