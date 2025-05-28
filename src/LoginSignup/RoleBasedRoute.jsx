import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

function RoleBasedRoute({ children, allowedRoles }) {
    const { user, loading } = useContext(UserContext);

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/LoginSignup" />;

    // console.log("Role:", role, "Allowed:", allowedRoles);
    // if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

    return children;

}
export default RoleBasedRoute;