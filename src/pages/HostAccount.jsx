import AccountTopbar from "../components/AcountTopbar";
import { useEffect, useState } from "react";
import CreateHackathon from "../components/OrganizationAccountComponents/CreateHackathon";

function HostAccount() {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const [activeTab, setActiveTab] = useState("Active");
    // saving active tab
    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <>
            <AccountTopbar />
            <div className="account-bg">
                <div className="inner-info">
                    <img alt="" src="/images/account-pic.png" className="account-pic" />
                    {/* <p className="account-nick">{user.username}</p> */}
                    <p className="account-nick">setuser</p>
                </div>
            </div>
            <section className="applications">
                <div className="tab">
                    <button onClick={() => handleTabClick("Active")}
                        className={`tablinks ${activeTab === "Active" ? "active" : ""}`}
                    >
                        Create hackathon
                    </button>

                    <button onClick={() => handleTabClick("In_process")}
                        className={`tablinks ${activeTab === "In_process" ? "active" : ""}`}
                    >
                        In process
                    </button>

                    <button onClick={() => handleTabClick("Completed")}
                        className={`tablinks ${activeTab === "Completed" ? "active" : ""}`}
                    >
                        Completed
                    </button>
                </div>

                <div id="Active" className="tabcontent" style={{ display: activeTab === "Active" ? "block" : "none" }}>
                    <CreateHackathon />
                </div>


                <div id="Active" className="tabcontent" style={{ display: activeTab === "Active" ? "block" : "none" }}>
                    <div className="header-container" style={{ display: "flex", justifyContent: "space-around", flexDirection: "row" }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        // Do something with the image data
                                        console.log(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="hack-image"
                            style={{ backgroundColor: "white", height: 200, width: 200 }} />
                        <div className="header-text" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <input type="text" placeholder="Hackathon name" className="hack-name" />
                            <input type="text" placeholder="Deadline" />
                        </div>
                    </div>
                </div>

                <div
                    id="In_process"
                    className="tabcontent"
                    style={{ display: activeTab === "In_process" ? "block" : "none" }}
                >
                    <h2>In Process Hackathons</h2>
                    <p>List of hackathons that are currently in process.</p>
                    <h2>Your hackathons</h2>
                    <section className="hostHackathons">

                    </section>

                </div>

                <div
                    id="Completed"
                    className="tabcontent"
                    style={{ display: activeTab === "Completed" ? "block" : "none" }}
                >
                    <h2>Completed Hackathons</h2>
                    <p>List of hackathons that have been completed.</p>
                </div>
            </section >


        </>
    );
}

export default HostAccount;