/* eslint-disable no-undef */
import { createContext, useContext, useCallback, useState } from 'react';
import api from '../api';

const UploadContext = createContext();

export function UploadProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const uploadPhotoAction = useCallback(async (dataImage) => {
    try {
      const formData = new FormData();
      formData.append('file', dataImage.file, dataImage.file.name);
      formData.append('body', dataImage.body);
      const res = await api.post('/photo/upload', formData);

      if (res.status === 201) {
        setData(res);
      }
    } catch (err) {
      if (err.response.status === 500) {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const resetValues = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(false);
  }, []);

  return (
    <UploadContext.Provider
      value={{ data, loading, error, uploadPhotoAction, resetValues }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within a UploadProvider  ');
  }
  return context;
}
