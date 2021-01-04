/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth';
import UserRoutesEnum from '../enums/UserRoutesEnum';

const NoAuthRoute = ({ component: Component, path }: RouteProps) => {
  if (isAuthenticated()) {
    return <Redirect to={UserRoutesEnum.HOME} />;
  }
  return <Route component={Component} path={path} />;
};

export default NoAuthRoute;
