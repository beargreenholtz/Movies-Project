import { createContext } from 'react';

// export interface Icontext {
// 	isLoggedIn: boolean;
// 	login: () => void;
// 	logout: () => void;
// }

export const AuthContext = createContext<{
	isLoggedIn: boolean;
	login: (_: React.SetStateAction<string | null>, __: unknown, expirationDate?: Date) => void;
	logout: () => void;
	userId: string | null;
	token: unknown;
	isLiked: boolean | null;
	setLikedAuth: (_: boolean | null) => unknown;
}>({
	isLoggedIn: false,
	userId: null,
	token: null,
	login: () => {},
	logout: () => {},
	isLiked: null,
	setLikedAuth: () => {},
});
