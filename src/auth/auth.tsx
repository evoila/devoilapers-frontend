import UserRolesEnum from '../enums/UserRolesEnum';

export function hasRole(role: UserRolesEnum) :boolean {
  return String(role) === `${localStorage.getItem('userRole')}`;
}

export function isAuthenticated() :boolean {
  return `${localStorage.getItem('isLogedin')}` === 'true';
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function login(username: string, password: string) :boolean {
  localStorage.setItem('isLogedin', 'true');
  localStorage.setItem('userRole', `${UserRolesEnum.ADMIN}`);

  if (isAuthenticated()) {
    return true;
  }
  return false;
}

export function logout() :void {
  localStorage.removeItem('isLogedin');
  localStorage.removeItem('userRole');
}
