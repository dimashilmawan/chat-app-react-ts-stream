import { FormEvent, useRef } from "react";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useAuthContext } from "../context/AuthContext";

const Signup = () => {
	const { signup } = useAuthContext();
	const usernameRef = useRef<HTMLInputElement>(null);
	const nameRef = useRef<HTMLInputElement>(null);
	const imageUrlRef = useRef<HTMLInputElement>(null);

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (signup.isLoading) return;

		const username = usernameRef.current?.value;
		const name = nameRef.current?.value;
		const imageUrl = imageUrlRef.current?.value;
		if (username == null || username === "" || name == null || name === "")
			return;

		signup.mutate({ id: username, name: name, image: imageUrl });
	};
	return (
		<>
			<h1 className="text-center text-3xl font-bold text-gray-800">Sign up</h1>
			<form onSubmit={submitHandler} className="mt-6 space-y-4">
				<div className="controls">
					<label className="label" htmlFor="username">
						Username
					</label>
					<Input id="username" pattern="\S*" required ref={usernameRef} />
				</div>
				<div className="controls">
					<label className="label" htmlFor="name">
						Name
					</label>
					<Input id="name" required ref={nameRef} />
				</div>
				<div className="controls">
					<label className="label" htmlFor="imagUrl">
						Image
					</label>
					<Input id="imageUrl" type="url" pattern="\S*" ref={imageUrlRef} />
				</div>
				<div className="!mt-6">
					<Button disabled={signup.isLoading} type="submit">
						{signup.isLoading ? "Loading" : "Signup"}
					</Button>
				</div>
			</form>
		</>
	);
};
export default Signup;
