import { useState, useEffect } from "react";

const App = () => {
	const [toggle, setToggle] = useState<boolean>(false);

	useEffect(() => {
		let isInterrupted = false;
		console.log("in " + isInterrupted);

		return () => {
			isInterrupted = true;
		};
	}, [toggle]);

	return (
		<div
			className={`flex h-screen w-full items-center justify-center ${
				toggle ? "bg-emerald-300" : "bg-gray-200"
			}`}
		>
			<button
				onClick={() => setToggle(prevState => !prevState)}
				className="rounded-md bg-emerald-600 px-2 py-1 capitalize text-white hover:scale-[1.05] hover:bg-opacity-80 active:scale-[0.95]"
			>
				Click Me
			</button>
		</div>
	);
};
export default App;
