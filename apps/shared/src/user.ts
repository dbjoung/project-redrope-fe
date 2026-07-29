export type LoginType = {
  email: string;
  password: string;
};

export type signInType = {
  nickname: string;
  email: string;
  password: string;
};

export type UserType = {
  id: string;
  nickname: string;
  email: string;
};

export type ResponseUserType = {
  accessToken: string;
} & UserType;
