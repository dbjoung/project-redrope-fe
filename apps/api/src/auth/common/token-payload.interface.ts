export interface AccessTokenPayload {
  userId: string;
  email: string;
  sid: string;
  type: "access";
}

export interface RefreshTokenPayload {
  userId: string;
  email: string;
  sid: string;
  jti: string;
  type: "refresh";
}
