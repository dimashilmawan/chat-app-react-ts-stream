import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { StreamChat } from "stream-chat";
import useLocalStorage from "../hooks/useLocalStorage";

type User = {
	id: string;
	name: string;
	image?: string;
};

type AuthContextObj = {
	signup: UseMutationResult<AxiosResponse, unknown, User>;
	login: UseMutationResult<{ token: string; user: User }, unknown, string>;
	logout: UseMutationResult<AxiosResponse, unknown, void>;
	user?: User;
	streamChat?: StreamChat;
};

type AuthContextProviderProps = {
	children: ReactNode;
};

const AuthContext = createContext<AuthContextObj | null>(null);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [user, setUser] = useLocalStorage<User>("user");
	const [token, setToken] = useLocalStorage<string>("token");
	const [streamChat, setStreamChat] = useState<StreamChat>();

	const navigate = useNavigate();

	const signup = useMutation({
		mutationFn: (user: User) => {
			return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user);
		},
		onSuccess: () => {
			navigate("/login");
		},
	});

	const login = useMutation({
		mutationFn: (id: string) => {
			return axios
				.post(`${import.meta.env.VITE_SERVER_URL}/login`, { id })
				.then(res => {
					return res.data as { token: string; user: User };
				});
		},
		onSuccess: data => {
			setUser(data.user);
			setToken(data.token);
		},
	});

	const logout = useMutation({
		mutationFn: () => {
			return axios.post(`${import.meta.env.VITE_SERVER_URL}/logout`, { token });
		},
		onSuccess: () => {
			setUser(undefined);
			setStreamChat(undefined);
			setToken(undefined);
		},
	});

	useEffect(() => {
		if (user == null || token == null) return;

		const chat = new StreamChat(import.meta.env.VITE_STREAM_API_KEY);

		if (chat.tokenManager.token === token && chat.userID === user.id) return;

		let isInterrupted = false;
		const connectPromise = chat.connectUser(user, token).then(() => {
			if (isInterrupted) return;
			setStreamChat(chat);
		});

		return () => {
			isInterrupted = true;
			setStreamChat(undefined);
			connectPromise.then(() => {
				chat.disconnectUser();
			});
		};
	}, [token, user]);

	return (
		<AuthContext.Provider value={{ signup, login, user, streamChat, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

export const useAuthContext = () => {
	return useContext(AuthContext) as AuthContextObj;
};

export const useLoggedInAuth = () => {
	return useContext(AuthContext) as AuthContextObj &
		Required<Pick<AuthContextObj, "user">>;
};

// ////////////////////////////////////////////////////////

// type AuthContextObj = {
// 	signup: ()=>void;
// };

// const AuthContext = createContext({}as AuthContextObj);

// const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
// 	const signup = ()=> {}
// 	return <AuthContext.Provider value={{signup}}>{children}</AuthContext.Provider>
// }

// export const useAuthContext = () => {
// 	return useContext(AuthContext);
// };
