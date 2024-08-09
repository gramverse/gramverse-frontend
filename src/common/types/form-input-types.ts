export interface LoginFormData {
  type: "login";
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
}

export interface SignUpFormData {
  type: "signup";
  email: string;
  username: string;
  password: string;
  name: string;
  lastname: string;
}

export type Keys = keyof LoginFormData | keyof SignUpFormData;
export type FormsData = LoginFormData | SignUpFormData;
export type FormNames = FormsData["type"];
