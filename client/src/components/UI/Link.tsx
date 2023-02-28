import { LinkProps, Link as RouterLink } from "react-router-dom";

const Link = ({ children, className, ...rest }: LinkProps) => {
	return (
		<RouterLink
			{...rest}
			className={` block text-center text-sm font-semibold text-blue-600 outline-none focus:ring-1 focus:ring-blue-600 focus:ring-offset-1 ${className}`}
		>
			{children}
		</RouterLink>
	);
};
export default Link;
