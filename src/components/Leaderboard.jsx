import React, {useEffect, useState} from "react";

const Leaderboard = ({ searchQuery = "" }) => {
  const [activeTab, setActiveTab] = useState("month");
  const [leaderboardData, setLeaderboardData] = useState({
    today: [],
    month: [],
    year: []
  });
  const [loading, setLoading] = useState(true);

  const getColor = (category) => {
    switch (category) {
      case "today":
        return "rgb(238, 238, 122)";
      case "month":
        return "rgb(125, 216, 230)";
      case "year":
        return "rgb(108, 177, 123)";
      default:
        return "#fff";
    }
  };

  const activeColor = getColor(activeTab);

  useEffect(() => {
    async function fetchLeaderboard(period, search) {
      try {
        const params = new URLSearchParams({ period });
        if (search.trim()) params.append('search', search.trim());

        const response = await fetch(`https://web-teamwork-backend.onrender.com/api/v1/leaderboard?${params.toString()}`);
        if (!response.ok) throw new Error(`Failed to fetch leaderboard for ${period}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching leaderboard (${period}):`, error);
        return [];
      }
    }

    async function fetchAllLeaderboards() {
      setLoading(true);
      const [todayData, monthData, yearData] = await Promise.all([
        fetchLeaderboard("today", searchQuery),
        fetchLeaderboard("month", searchQuery),
        fetchLeaderboard("year", searchQuery)
      ]);

      setLeaderboardData({
        today: todayData,
        month: monthData,
        year: yearData
      });

      setLoading(false);
    }

    fetchAllLeaderboards();
  }, [searchQuery]);

  if (loading) return <div>Loading...</div>;

  return (
      <div className="wrapper">
        <div className="lboard_section" style={{ backgroundColor: activeColor }}>
          <div className="lboard_tabs">
            <ul>
              {["today", "month", "year"].map((category) => (
                  <li
                      key={category}
                      className={activeTab === category ? "active" : ""}
                      onClick={() => setActiveTab(category)}
                      data-li={category}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </li>
              ))}
            </ul>
          </div>

          <div className="lboard_wrap">
            {leaderboardData[activeTab].map((user, index) => (
                <div
                    className="lboard_mem"
                    key={user.id}
                    style={{ borderBottom: `8px solid ${activeColor}` }}
                >
                  <div className="name_bar">
                    <p>
                      <span>{index + 1}.</span> {user.email}
                    </p>
                  </div>
                  <div className="points">{user.total_prize} points</div>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Leaderboard;
