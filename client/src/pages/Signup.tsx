import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

const Signup = () => {
	return (
		<>
			<h1 className="text-center text-3xl font-bold text-gray-800">Sign up</h1>
			<form className="mt-6 space-y-4">
				<div className="controls">
					<label className="label" htmlFor="username">
						Username
					</label>
					<Input id="username" pattern="\S*" required />
				</div>
				<div className="controls">
					<label className="label" htmlFor="name">
						Name
					</label>
					<Input id="name" required />
				</div>
				<div className="controls">
					<label className="label" htmlFor="imagUrl">
						Image
					</label>
					<Input id="imageUrl" type="url" pattern="\S*" />
				</div>
				<div className="!mt-6">
					<Button type="submit">Sign up</Button>
				</div>
			</form>
		</>
	);
};
export default Signup;
