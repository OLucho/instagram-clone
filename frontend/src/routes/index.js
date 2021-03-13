import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Main from '../pages/main';
import SignUp from '../pages/signUp';
import SignIn from '../pages/signIn';
import Post from '../pages/post';
import Route from './route';
import Profile from '../pages/profile';
import Edit from '../pages/edit';

export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} isPrivate />
          <Route exact path="/photo/:photoId" component={Post} isPrivate />
          <Route
            exact
            path="/profile/:username"
            component={Profile}
            isPrivate
          />
          <Route exact path="/edit/:username" component={Edit} isPrivate />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </Router>
    </>
  );
}
