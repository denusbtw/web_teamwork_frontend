import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { auth } from "../LoginSignup/Firebase";
import { UserContext } from "../UserContext";
import '../style/toggleMenu.css'

function AccountTopbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const { setUser } = useContext(UserContext);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleOpenComponent = () => setIsPanelOpen(true);
    const handleCloseComponent = () => setIsPanelOpen(false);

    function handleLogout() {
        auth.signOut().then(() => { setUser(null); })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    }

    const handleDeleteAccount = () => {
        const user = auth.currentUser;
        if (user) {
            user.delete().then(() => {
                setUser(null);
            }).catch((error) => {
                console.error("Error deleting account: ", error);
            });
        }
    };

    const handleChangeName = () => {
        // Тут можна додати реальну логіку оновлення імені через Firebase
        alert("Name change feature coming soon!");
    };

    return (
        <>
            <header className="navigation">
                <div className="account_home">
                    <Link to="/">
                        <img alt="" src="https://live.staticflickr.com/124/337160380_f5681cab06_w.jpg"></img>
                        Home
                    </Link>
                </div>

                <div className="icons">

                    <img onClick={handleOpenComponent} alt="settings" src="https://www.svgrepo.com/show/456992/account.svg"></img>


                    <img
                        alt=""
                        src="https://www.svgrepo.com/show/506800/burger-menu.svg"
                        className="menu"
                        onClick={toggleMenu}
                    />
                    <div className={`sub-menu-wrap ${isMenuOpen ? 'open-menu' : ''}`} id="subMenu">
                        <div className="sub-menu">
                            <div className="menu-info">
                                <img alt="" src="https://www.svgrepo.com/show/506800/burger-menu.svg" className="menu"></img>
                                <h3>Menu</h3>
                            </div>
                            <hr></hr>

                            <Link to="/competition" className="sub-menu-link">
                                <p>More hackathons</p>
                                <span>&gt;</span>
                            </Link>

                            <Link to="/rating" className="sub-menu-link">
                                <p>Leaderboard </p>
                                <span>&gt;</span>
                            </Link>

                            <Link to="/" onClick={handleLogout}>
                                <p className="sub-menu-link" >
                                    <p>Log out</p>
                                    <span>&gt;</span>
                                </p>
                            </Link>

                        </div>
                    </div>
                </div>
            </header>

            {isPanelOpen && (
                <div className="overlay-menu">
                    <div className="account-panel">
                        <button className="close-btn" onClick={handleCloseComponent}>×</button>
                        <h2>Account Settings</h2>
                        <div>
                            <input placeholder="Enter new name"></input>
                            <button onClick={handleChangeName}>Change Name</button>
                        </div>
                        <div>
                            <input placeholder="Input image"></input>
                            <button onClick={handleChangeName}>Change account image</button>
                        </div>
                        <button onClick={handleDeleteAccount} className="delete-btn">Delete Account</button>
                    </div>
                </div>
            )}

        </>
    );
}

export default AccountTopbar;