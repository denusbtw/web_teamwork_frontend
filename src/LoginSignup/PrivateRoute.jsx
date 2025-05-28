import {getAuth} from "firebase/auth";
import {useAuthState} from 'react-firebase-hooks/auth';
import {Navigate} from "react-router-dom";

function PrivateRoute({ children }) {
    const [user, loading] = useAuthState(getAuth());

    if (loading) {
        // можна замінити на анімацію завантаження
        return <div>Loading...</div>;
    }
    return user ? (
        children
    ) : (
        <Navigate to="/login" />
    );
}
export default PrivateRoute;