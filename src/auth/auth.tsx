import UserRolesEnum from '../enums/UserRolesEnum';

export function userRole() :string {
  return String(UserRolesEnum.USER);
}
export function isAuthenticated() :boolean {
  return false;
}

export default isAuthenticated;
