import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Video from '../pages/Video';
import Curso from '../pages/curso';
import Error from '../pages/Error';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Login} isClosed />
      <MyRoute exact path="/login" component={Login} />
      <MyRoute exact path="/videos" component={Video} />
      <MyRoute exact path="/cursos" component={Curso} isClosed />
      <MyRoute path="*" component={Error} />
    </Switch>
  );
}
