import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import Home from "./pages/Home";
import AuthLayout from "./pages/layouts/AuthLayout";
import RootLayout from "./pages/layouts/RootLayout";
import Login from "./pages/Login";
import NewChannel from "./pages/channel/NewChannel";
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
				// path: "/",
				element: <RootLayout />,
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: "channel",
						children: [{ path: "new", element: <NewChannel /> }],
					},
				],
			},
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
