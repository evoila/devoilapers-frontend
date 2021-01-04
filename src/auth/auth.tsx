import UserRolesEnum from '../enums/UserRolesEnum';

export function userRole() :string {
  return String(UserRolesEnum.ADMIN);
}
export function isAuthenticated() :boolean {
  return true;
}

export default isAuthenticated;
