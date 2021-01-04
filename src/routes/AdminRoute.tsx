/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { isAuthenticated, userRole } from '../auth/auth';
import NotAuthRoutesEnum from '../enums/NotAuthRoutesEnum';
import UserRolesEnum from '../enums/UserRolesEnum';
import UserRoutesEnum from '../enums/UserRoutesEnum';

const AdminRoute = ({ component: Component, path }: RouteProps) => {
  if (!isAuthenticated()) {
    return <Redirect to={NotAuthRoutesEnum.LOGIN} />;
  }
  if (userRole() !== UserRolesEnum.ADMIN) {
    return <Redirect to={UserRoutesEnum.UNAUTHORIZED} />;
  }
  return <Route component={Component} path={path} />;
};

export default AdminRoute;
