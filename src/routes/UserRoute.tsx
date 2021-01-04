/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth';
import NotAuthRoutesEnum from '../enums/NotAuthRoutesEnum';

const UserRoute = ({ component: Component, path }: RouteProps) => {
  if (!isAuthenticated()) {
    return <Redirect to={NotAuthRoutesEnum.LOGIN} />;
  }
  return <Route component={Component} path={path} />;
};

export default UserRoute;
