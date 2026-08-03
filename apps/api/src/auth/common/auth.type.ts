export type AuthPayloadAfterType = AuthPayloadBeforeType & {
  iat?: number;
  exp?: number;
};

export type AuthPayloadBeforeType = {
  userId: string;
  email: string;
};

export type TokensType = {
  accessToken: string;
  refreshToken: string;
};
