import { Outlet, useLocation } from "react-router-dom";
import Card from "../../components/UI/Card";
import Link from "../../components/UI/Link";

const AuthLayout = () => {
	const location = useLocation();
	const isLoginPage = location.pathname === "/login";

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100">
			<Card>
				<Outlet />
			</Card>
			<Link to={isLoginPage ? "/signup" : "/login"} className="z-20 mt-2">
				{isLoginPage ? "Sign up" : "Login"}
			</Link>
		</div>
	);
};
export default AuthLayout;
