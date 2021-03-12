import React from 'react';
import { AuthProvider } from './auth';
import { UploadProvider } from './upload';
import { SearchProvider } from './search';
import { FollowProvider } from './follow';
import { FeedProvider } from './feed';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <UploadProvider>
        <FollowProvider>
          <SearchProvider>
            <FeedProvider>{children}</FeedProvider>
          </SearchProvider>
        </FollowProvider>
      </UploadProvider>
    </AuthProvider>
  );
}
