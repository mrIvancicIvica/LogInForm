import { createContext, useEffect, useState } from 'react';
import axios from '../api/axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [openBar, setOpenBar] = useState(false);

  console.log(
    '🚀 ~ file: UserContext.jsx ~ line 8 ~ UserProvider ~ user',
    user
  );

  const fetchData = async () => {
    const res = await axios;
    setUser(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, openBar, setOpenBar }}>
      {children}
    </UserContext.Provider>
  );
};
