import { ReactNode } from "react";

type CardProps = {
	children: ReactNode;
};

const Card = ({ children }: CardProps) => {
	return (
		<div className=" w-full max-w-sm  rounded-xl bg-white p-8 shadow-lg">
			{children}
		</div>
	);
};
export default Card;
