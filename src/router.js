import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/home';
import FavBank from './components/home/favourite';
import BankDetail from './components/home/detail';

export const AppRouter = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact render={props => <Home {...props} />} />
        <Route path="/fav" render={props => <FavBank {...props} />} />
        <Route path="/detail/:id" render={props => <BankDetail {...props} />} />
      </Switch>
    </>
  );
};
