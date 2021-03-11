import React from 'react';
import { AuthProvider } from './auth';
import { UploadProvider } from './upload';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <UploadProvider>{children}</UploadProvider>
    </AuthProvider>
  );
}
