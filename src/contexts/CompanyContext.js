import React,{useContext, useEffect ,useState} from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
  const CompanyContext=React.createContext();

    export function useCompany(){
        return useContext(CompanyContext);
    }
export default function CompanyProvider({children}) {

     const {currentUser} =useAuth();
     const [companyData,setCompanyData]=useState(null);

    useEffect(()=>{
         handleData();
    },[])


    const handleData=() =>{
       axios.get(`http://localhost:5000/company/getcompanydata/${currentUser}`).then(res=>{
           setCompanyData(res);
           console.log(companyData);
           console.log('calling ')
       })
    }

    const value={
      companyData
    }
  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  )
}
