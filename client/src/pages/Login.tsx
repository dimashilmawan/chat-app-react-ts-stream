import { FormEvent, useRef } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
	const { login, user } = useAuthContext();
	const usernameRef = useRef<HTMLInputElement>(null);

	if (user != null) return <Navigate to="/" />;

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (login.isLoading) return;

		const username = usernameRef.current?.value;
		if (username == null || username === "") return;

		login.mutate(username);
	};
	return (
		<>
			<h1 className="text-center text-3xl font-bold text-gray-800">Log in</h1>
			<form onSubmit={submitHandler} className="mt-6 space-y-4">
				<div className="controls">
					<label className="label" htmlFor="username">
						Username
					</label>
					<Input id="username" pattern="\S*" required ref={usernameRef} />
				</div>
				<div className="!mt-6">
					<Button disabled={login.isLoading} type="submit">
						{login.isLoading ? "Loading" : "Login"}
					</Button>
				</div>
			</form>
		</>
	);
};
export default Login;
