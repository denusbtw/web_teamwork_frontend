import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";
// import { getUserRoleFromDatabase } from "../databaseService";

function Topbar() {

  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const handleNavigate = () => {
    if (!user) {
      navigate("/LoginSignup");
      return;
    }
    navigate(`/user/me`);
  };

  return (
    <>
      <header>
        <nav className="nav-menu">
          <div className="home">
            <Link to="/">
              <img alt="description" src="https://live.staticflickr.com/124/337160380_f5681cab06_w.jpg"></img>
              Home
            </Link>
          </div>

          <ul className="nav-list">
            <li className="list-item">
              <Link to="/competition">
                Hackathons
              </Link>
            </li>

            {/* перевірка чи користувач залогінився */}
            {user ? (
              <li className="list-item">
                <p onClick={handleNavigate}>
                  My account
                </p>
              </li>
            ) : (
              <li className="list-item">
                <Link to="/LoginSignup">
                  Sign up
                </Link>
              </li>
            )}


            <li className="list-item">
              <Link to="/rating">
                Rating
              </Link>
            </li>

          </ul>
        </nav>
      </header>

    </>
  );

}

export default Topbar;