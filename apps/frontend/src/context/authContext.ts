/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export const AuthContext = createContext<{
	isLoggedIn: boolean;
	userId: string | null;
	token: string | null;
	login: (_: React.SetStateAction<string | null>, token: string, expirationDate?: Date) => void;
	logout: () => void;
	isLiked: boolean | null;
	setLikedAuth: (_: boolean | null) => void;
}>({
	isLoggedIn: false,
	userId: null,
	token: null,
	login: () => {},
	logout: () => {},
	isLiked: null,
	setLikedAuth: () => {},
});
