export interface UserLoginModel {
  username: string;
  password: string;
}

export interface UserMeModel {
  id: string;
  username: string;
  ime: string;
  prezime: string;
  tip: string;
}

export interface UserRegisterModel {
  username: string;
  lozinka: string;
  ime: string;
  prezime: string;
  tip: string;
}

export interface AuthResponseModel {
  token: string;
  refreshToken?: string;
  roles?: string[];
}
