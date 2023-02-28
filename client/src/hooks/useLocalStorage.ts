import { useState, useEffect } from "react";

const useLocalStorage = <T>(
	key: string,
	initialValue?: T | undefined | (() => T | undefined)
) => {
	const [value, setValue] = useState<T | undefined>(() => {
		const jsonValue = localStorage.getItem(key);
		if (jsonValue == null) {
			if (typeof initialValue === "function") {
				return (initialValue as () => T)();
			} else {
				return initialValue;
			}
		} else {
			return JSON.parse(jsonValue);
		}
	});

	useEffect(() => {
		if (value === undefined) {
			localStorage.removeItem(key);
			return;
		}

		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue] as [typeof value, typeof setValue];
};
export default useLocalStorage;
