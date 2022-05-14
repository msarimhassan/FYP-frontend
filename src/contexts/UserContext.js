import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserDataProvider = ({ children }) => {
	const [userData, setUserData] = useState();
	const value = {
		userData,
		setUserData
	};
	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};

export { UserContext, UserDataProvider };
