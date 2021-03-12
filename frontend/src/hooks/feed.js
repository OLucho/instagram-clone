import { createContext, useContext, useCallback, useState } from 'react';
import api from '../api';

const FeedContext = createContext();

export function FeedProvider({ children }) {
  const [feeds, setFeeds] = useState([]);

  const getFeeds = useCallback(async () => {
    try {
      const res = await api.get('/feed');
      if (res.status === 200) {
        setFeeds(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const deletePhotoAction = useCallback(async (photo) => {
    try {
      const res = await api.delete(`/photo/${photo.id}`);
      if (res.status === 200) {
        setFeeds((state) => state.filter((item) => item.photo.id !== photo.id));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteFollowAction = useCallback(async (idUser) => {
    try {
      await api.post(`/follow/${idUser}`);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <FeedContext.Provider
      value={{
        getFeeds,
        feeds,
        deletePhotoAction,
        deleteFollowAction,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

export function useFeed() {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error('useFeed must be used within a FeedProvider  ');
  }
  return context;
}
