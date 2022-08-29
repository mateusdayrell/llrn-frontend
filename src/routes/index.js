import React from 'react';
import { Switch } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import MyRoute from './MyRoute';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Video from '../pages/Video';
import Curso from '../pages/Curso';
import Treinamento from '../pages/Treinamento';
import Error from '../pages/Error';
import AdmUsuario from '../pages/Admin/Usuario';

export default function Routes() {
  // const tipoUsuario = useSelector((state) => state.auth.usuario.tipo);
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} />
      <MyRoute exact path="/login" component={Login} />
      <MyRoute exact path="/treinamentos" component={Treinamento} isClosed />
      <MyRoute exact path="/curso" component={Curso} isClosed />
      <MyRoute exact path="/usuarios" component={AdmUsuario} isClosed />
      <MyRoute exact path="/video/:id" component={Video} />
      <MyRoute path="*" component={Error} />
    </Switch>
  );
}
