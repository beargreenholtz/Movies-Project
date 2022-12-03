import React, { useState, useCallback, useEffect } from 'react';
import { AuthContext } from './context/authContext';

import AppView from './App.view';

interface IProps {}

const App: React.FC<IProps> = () => {
	const [token, setToken] = useState<unknown>();
	const [userId, setUserId] = useState<string | null>('');

	const login = useCallback(
		(uid: React.SetStateAction<string | null>, token: unknown, expirationDate?: Date) => {
			setToken(token);
			setUserId(uid);
			const tokenExpartionDate = expirationDate || new Date(new Date().getTime() + 1000 * 60);
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

	const contextValue: {
		isLoggedIn: any;
		userId: string | null;
		token: unknown;
		login: (_: React.SetStateAction<string | null>, token: unknown, expirationDate?: Date) => void;
		logout: () => void;
	} = {
		isLoggedIn: !!token,
		token: token,
		login: login,
		logout: logout,
		userId: userId,
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
