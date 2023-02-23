import { Outlet } from "react-router-dom";
import Card from "../../components/UI/Card";

const AuthLayout = () => {
	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
			<Card>
				<Outlet />
			</Card>
		</div>
	);
};
export default AuthLayout;
