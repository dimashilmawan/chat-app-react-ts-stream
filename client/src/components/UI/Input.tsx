import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from "react";
type InputProps = {
	className: string;
};

const Input = forwardRef<
	HTMLInputElement,
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(({ className, ...rest }, ref) => {
	return (
		<input
			ref={ref}
			className={`rounded-md px-2 py-1 outline-none ring-1 ring-gray-200 ${className} focus:ring-blue-600`}
			{...rest}
		/>
	);
});
export default Input;
