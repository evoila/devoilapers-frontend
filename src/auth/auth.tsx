import UserRolesEnum from '../enums/UserRolesEnum';

export function login(username: string, password: string) :string {
  return `Wrong Username ${username} and Password${password}`;
}

export function userRole() :string {
  return String(UserRolesEnum.USER);
}
export function isAuthenticated() :boolean {
  return false;
}

export default isAuthenticated;
