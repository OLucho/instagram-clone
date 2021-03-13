/* eslint-disable no-undef */
import { createContext, useContext, useCallback, useState } from 'react';
import api from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [error, setError] = useState('');

  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@Instagram:token');
    const user = localStorage.getItem('@Instagram:user');
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return { token: null, user: null };
  });

  const signIn = useCallback(async ({ username, password }) => {
    const auth = await api.post('/user/signin', { username, password });
    if (auth.status === 201) {
      const { accessToken } = auth.data;
      api.defaults.headers.authorization = `Bearer ${accessToken}`;
      const user = await api.get('/user/auth/me');
      localStorage.setItem('@Instagram:token', accessToken);
      localStorage.setItem('@Instagram:user', JSON.stringify(user.data));

      setData({
        user: user.data,
        token: accessToken,
      });
    }
  }, []);

  function signOut() {
    localStorage.removeItem('@Instagram:token');
    localStorage.removeItem('@Instagram:token');
    setData({ token: null, user: null });
  }

  const editUser = useCallback(
    async ({ username, password, name, email, bio }) => {
      try {
        const res = await api.post('/user/update', {
          username,
          password,
          name,
          email,
          bio,
        });
        if (res.status === 201) {
          signOut();
          setError('');
        }
      } catch (err) {
        setError(err.response.data.message);
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        error,
        signIn,
        signOut,
        editUser,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('use Auth must be used within a AuthProvider  ');
  }
  return context;
}
