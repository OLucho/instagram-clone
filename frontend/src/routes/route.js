/* eslint-disable react/jsx-props-no-spreading */
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

export default function HandleRoutes({
  isPrivate = false,
  component: Component,
  ...rest
}) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isPrivate === !!user ? (
          <>
            <Component />
          </>
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/signin' : '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
