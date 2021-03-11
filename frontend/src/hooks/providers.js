import React from 'react';
import { AuthProvider } from './auth';
import { UploadProvider } from './upload';
import { SearchProvider } from './search';
import { FollowProvider } from './follow';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <UploadProvider>
        <FollowProvider>
          <SearchProvider>{children}</SearchProvider>
        </FollowProvider>
      </UploadProvider>
    </AuthProvider>
  );
}
