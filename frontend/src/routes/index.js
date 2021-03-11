import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
    </>
  );
}
