import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import AuthLayout from "./pages/layouts/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const ContextWrapper = () => {
	return (
		<AuthContextProvider>
			<Outlet />
		</AuthContextProvider>
	);
};

export const router = createBrowserRouter([
	{
		element: <ContextWrapper />,
		children: [
			{
				element: <AuthLayout />,
				children: [
					{
						path: "signup",
						element: <Signup />,
					},
					{
						path: "login",
						element: <Login />,
					},
				],
			},
		],
	},
]);
