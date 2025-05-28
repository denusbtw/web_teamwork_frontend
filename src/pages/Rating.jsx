import {useState} from "react";
import Leaderboard from "../components/Leaderboard";
import Topbar from "../components/Topbar";

function Rating() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <Topbar />
            <h2>Leaderboard</h2>
            <section className="searchbar-section">
                <div>
                    <input
                        placeholder="Enter participants details"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <img alt="" className="search-icon" src="images/search.svg" />
                </div>
            </section>
            <Leaderboard searchQuery={searchQuery} />
        </>
    );
}

export default Rating;
