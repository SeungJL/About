export interface IRegisterForm {
  registerDate: string;
  name: string;
  mbti?: string;
  birth: string;
  agree?: any;
  gender?: string;
}
export interface IUserRegister extends IRegisterForm {
  role?: string;
  isActive?: boolean;
  gender: string;
}
