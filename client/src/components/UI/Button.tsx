import { forwardRef, DetailedHTMLProps, ButtonHTMLAttributes } from "react";

const Button = forwardRef<
	HTMLButtonElement,
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(({ className, children, ...rest }, ref) => {
	return (
		<button
			ref={ref}
			className={`w-full rounded-md bg-blue-500 py-2 text-sm font-semibold text-white outline-none hover:bg-opacity-80 focus:ring-1 focus:ring-blue-600 focus:ring-offset-[2px] disabled:bg-gray-400 disabled:text-gray-100 ${className} `}
			{...rest}
		>
			{children}
		</button>
	);
});
export default Button;
