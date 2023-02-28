import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const RootLayout = () => {
	const { user } = useAuthContext();

	if (user == null) return <Navigate to="/login" />;

	return <Outlet />;
};
export default RootLayout;
