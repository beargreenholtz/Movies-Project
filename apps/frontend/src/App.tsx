import React, { useState, useCallback, useEffect } from 'react';
import { AuthContext } from './context/authContext';

import AppView from './App.view';

interface IProps {}

const App: React.FC<IProps> = () => {
	const [token, setToken] = useState<string | null>('');
	const [userId, setUserId] = useState<string | null>('');
	const [isLiked, setIsLiked] = useState<boolean | null>(null);

	const login = useCallback(
		(uid: React.SetStateAction<string | null>, token: string | null, expirationDate?: Date) => {
			setToken(token);
			setUserId(uid);
			const tokenExpartionDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

			localStorage.setItem(
				'userData',
				JSON.stringify({ userId: uid, token: token, expiration: tokenExpartionDate.toISOString() }),
			);
		},
		[],
	);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData') || '{}');

		if (storedData !== '{}' && storedData.token && new Date(storedData.expiration) > new Date()) {
			login(storedData.userId, storedData.token, new Date(storedData.expiration));
		}
	}, [login]);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		localStorage.removeItem('userData');
	}, []);

	const setLikedAuth = (liked: boolean | null) => {
		setIsLiked(liked);
	};

	const contextValue: {
		isLoggedIn: boolean;
		userId: string | null;
		token: string | null;
		isLiked: boolean | null;
		login: (_: React.SetStateAction<string | null>, token: string, expirationDate?: Date) => void;
		logout: () => void;
		setLikedAuth: (_: boolean | null) => void;
	} = {
		isLoggedIn: !!token,
		token: token,
		userId: userId,
		isLiked: isLiked,
		login: login,
		logout: logout,
		setLikedAuth: setLikedAuth,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			<AppView />
		</AuthContext.Provider>
	);
};

App.displayName = 'App';
App.defaultProps = {};

export default React.memo(App);
