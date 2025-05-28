import Topbar from "../components/Topbar";

function Unauthorized() {
    return (
        <div>
            <Topbar />
            <h1>Unauthorized</h1>
            <p>You do not have permission to access this page.</p>
            <img width="200" src="https://i.redd.it/a1p2h7ir0c791.jpg" alt="Unauthorized" />
        </div>
    );
}

export default Unauthorized;