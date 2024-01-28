export type SessionTokens = {
  access_token: string;
  refresh_token: string;
};

export type RefreshTokenDto = {
  userId: string;
  refreshToken: string;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export type JwtPayload = {
  email: string;
  sub: number;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
