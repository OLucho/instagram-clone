import { createContext, useContext, useCallback, useState } from 'react';
import api from '../api';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchAction = useCallback(async (term) => {
    try {
      if (term) {
        setLoading(true);
        const res = await api.get(`/user/search/${term}`);
        if (res.status === 200) {
          setUsers(res.data);
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <SearchContext.Provider value={{ users, loading, searchAction, setUsers }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider  ');
  }
  return context;
}
