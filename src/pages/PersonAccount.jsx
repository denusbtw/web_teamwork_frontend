import React, {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import AccountTopbar from "../components/AcountTopbar";
import "../style/account_topbar.css";
import "../style/account.css";
import displayBanner from "../components/NotificationBanner";

const STATUS_MAP = {
    Active: "active",
    In_process: "pending",
    Completed: "completed"
};

function PersonAccount() {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const [activeTab, setActiveTab] = useState("Active");
    const [participants, setParticipants] = useState([]);
    const [loadingParticipants, setLoadingParticipants] = useState(true);

    const token = localStorage.getItem("accessToken");
    const baseURL = "http://localhost:8000";

    useEffect(() => {
        if (!token) return;

        fetch(`${baseURL}/api/v1/users/me/`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoadingUser(false));
    }, [token]);

    useEffect(() => {
        if (!token || !user?.id) return;

        setLoadingParticipants(true);
        const status = STATUS_MAP[activeTab];

        fetch(`${baseURL}/api/v1/users/${user.id}/participants/?status=${status}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch participants");
                return res.json();
            })
            .then(setParticipants)
            .catch(() => setParticipants([]))
            .finally(() => setLoadingParticipants(false));
    }, [user, activeTab, token]);

    const handleRemove = async (participantId) => {
        if (!user || !token) return;

        try {
            const response = await fetch(`${baseURL}/api/v1/users/${user.id}/participants/${participantId}/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to remove participant');
            }

            setParticipants(prev => prev.filter(p => p.id !== participantId));
            displayBanner('Successfully removed from hackathon.');
        } catch (error) {
            console.error('Error deleting participant:', error);
            alert('Failed to remove. Try again.');
        }
    };


    if (loadingUser) return <div>Loading user...</div>;
    if (!user) return <Navigate to="/login" replace />;

    return (
        <>
            <AccountTopbar />

            <div
                className="account-bg"
                style={{ backgroundImage: `url(${baseURL}${user.profile_background})` }}
            >
                <div className="inner-info">
                    <img
                        alt="Profile"
                        src={`${baseURL}${user.profile_picture}`}
                        className="account-pic"
                    />
                    <p className="account-nick">{user.username}</p>
                </div>
            </div>

            <section className="applications">
                <div className="tab">
                    {Object.keys(STATUS_MAP).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`tablinks ${activeTab === tab ? "active" : ""}`}
                        >
                            {tab.replace("_", " ")}
                        </button>
                    ))}
                </div>

                <div className="tabcontent" style={{ display: "block" }}>
                    <div className="content-wrapper">
                        <div className="banner" id="banner"></div>

                        {loadingParticipants ? (
                            <div>Loading hackathons...</div>
                        ) : participants.length > 0 ? (
                            <div className="card-grid">
                                {participants.map(({ id, hackathon, status }) => (
                                    <div className="card" key={id}>
                                        <div className="image-content">
                                            <span className="overlay"></span>
                                            <img
                                                src={hackathon.image}
                                                className="card-img"
                                                alt={hackathon.name}
                                            />
                                        </div>
                                        <div className="card-content">
                                            <h2 className="name">{hackathon.title}</h2>
                                            <p className="rules">Status: {status}</p>
                                            <button
                                                className="button"
                                                onClick={() => handleRemove(id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-content">
                                <img
                                    src="https://i.pinimg.com/736x/54/9c/10/549c10713685a3162b9f71387c7f1914.jpg"
                                    className="no-content"
                                    alt="No hackathons"
                                />
                                <h3>No {activeTab.toLowerCase()} hackathons</h3>
                                <h3>Look for some here ↓</h3>
                                <button className="button">
                                    <Link to="/competition">More hackathons</Link>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default PersonAccount;
