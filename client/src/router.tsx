import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./pages/layouts/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export const router = createBrowserRouter([
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
]);
