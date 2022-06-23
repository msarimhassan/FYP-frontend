import React, { useState, createContext } from 'react';


const CompanyContext = createContext();

const CompanyDataProvider = ({ children }) => {
	const [companyData, setCompanyData] = useState(null);
	const [count, setCount] = useState(null);
	const [favCount,setfavCount]=useState(null)
	const value = {
		companyData,
		setCompanyData,
		count,
		setCount,
		favCount,
		setfavCount
	};
	return (
		<CompanyContext.Provider value={value}>
			{children}
		</CompanyContext.Provider>
	);
};

export { CompanyContext, CompanyDataProvider };
