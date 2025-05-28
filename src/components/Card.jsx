import {Link} from "react-router-dom";

function Card({ hackathon }) {

    if (!hackathon) {
        return null;
    }

    const formattedDate = new Date(hackathon.start_datetime).toLocaleString("uk-UA");

    return (
        <div className="card">
            <div className="image-content">
                <span className="overlay"></span>
                <img
                    alt="description"
                    src={hackathon.image}
                    className="card-img"
                />
            </div>
            <div className="card-content">
                {/* TODO: перейменувати name -> title, theme -> category*/}
                <h3 className="name">{hackathon.title}</h3>
                <p className="theme">{hackathon.category.title}</p>
                <p className="prize-card">{hackathon.prize}</p>
                <p className="date">{formattedDate}</p>
                {/*TODO: */}
                {/*<p className="rules">{hackathon.rules}</p>*/}
                <Link to={`/hackathon/${hackathon.id}`}>
                    <button className="button">View more</button>
                </Link>
            </div>
        </div>
    );
}

export default Card;
