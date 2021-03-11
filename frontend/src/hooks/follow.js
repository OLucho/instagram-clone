import { createContext, useContext, useCallback, useState } from 'react';
import api from '../api';

const FollowContext = createContext();

export function FollowProvider({ children }) {
  const [follows, setFollows] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFollows = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/feed/follows');
      if (res.status === 200) {
        setFollows(res.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFollow = useCallback(async (id) => {
    setFollows((state) => state.filter((follow) => follow.i !== id));
  }, []);

  return (
    <FollowContext.Provider
      value={{ follows, loading, getFollows, removeFollow }}
    >
      {children}
    </FollowContext.Provider>
  );
}

export function useFollow() {
  const context = useContext(FollowContext);
  if (!context) {
    throw new Error('useFollow must be used within a FollowProvider  ');
  }
  return context;
}
