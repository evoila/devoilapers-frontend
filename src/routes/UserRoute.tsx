/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { hasRole } from '../auth/auth';
import NotAuthRoutesEnum from '../enums/NotAuthRoutesEnum';
import UserRolesEnum from '../enums/UserRolesEnum';

const UserRoute = ({ component: Component, path }: RouteProps) => {
  if (!hasRole(UserRolesEnum.USER)) {
    return <Redirect to={NotAuthRoutesEnum.LOGIN} />;
  }
  return <Route component={Component} path={path} />;
};

export default UserRoute;
