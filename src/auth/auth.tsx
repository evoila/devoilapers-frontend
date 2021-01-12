import UserRolesEnum from '../enums/UserRolesEnum';
import {
  AccountApi,
  DtosAccountCredentialsDto,
  ServicestoreApi,
  DtosServiceStoreItemDto,
} from '../api/api';

export function hasRole(role: UserRolesEnum) :boolean {
  return `${localStorage.getItem('userRole')}` === String(role);
}

export function isAuthenticated() :boolean {
  return `${localStorage.getItem('isLogedin')}` === 'true';
}

export function saveUsernamePassword(username:string, password: string) :void {
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
}

export function getUsername() :string {
  return `${localStorage.getItem('username')}`;
}

export function getPassword() :string {
  return `${localStorage.getItem('password')}`;
}
const host = 'https://127.0.0.1:8080/api/v1';

let accountApi: AccountApi = new AccountApi(host);
let servicestoreApi: ServicestoreApi;

function createApis() {
  const username: string = getUsername();
  const password: string = getPassword();

  accountApi = new AccountApi(username, password, host);
  servicestoreApi = new ServicestoreApi(username, password, host);
}
if (isAuthenticated()) {
  createApis();
}

export async function servicestoreInfoGet() :Promise<DtosServiceStoreItemDto[]> {
  const res = await servicestoreApi.servicestoreInfoGet();

  let tmp = new Array<DtosServiceStoreItemDto>();

  if (res.response.statusCode === 200 && res.body.services !== undefined) {
    tmp = res.body.services;
  }
  return tmp;
}

export async function login(username: string, password: string) :Promise<boolean> {
  saveUsernamePassword(username, password);

  const dtosAccountCredentialsDto = new DtosAccountCredentialsDto();
  dtosAccountCredentialsDto.username = username;
  dtosAccountCredentialsDto.password = password;

  try {
    const res = await accountApi.accountsLoginPost(dtosAccountCredentialsDto);
    if (res.response.statusCode === 200 && res.body.isValid) {
      localStorage.setItem('isLogedin', 'true');
      localStorage.setItem('userRole', `${res.body.role}`);

      createApis();

      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
}

export function logout() :void {
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  localStorage.removeItem('isLogedin');
  localStorage.removeItem('userRole');
}
