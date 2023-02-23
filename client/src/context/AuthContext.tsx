import { createContext, ReactNode, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type AuthContextObj = {};

type AuthContextProviderProps = {
	children: ReactNode;
};

type User = {
	id: string;
	name: string;
	imageUrl?: string;
};

const AuthContext = createContext<AuthContextObj | null>(null);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => {
	const signup = useMutation({
		mutationFn: (user: User) => {
			return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user);
		},
	});
	return useContext(AuthContext);
};
