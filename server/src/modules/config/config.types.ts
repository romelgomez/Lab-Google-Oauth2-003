export enum EnvironmentEnum {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export enum DatabaseTypeEnum {
  Postgres = 'postgres',
}

export type EnvironmentConfig = {
  environment: EnvironmentEnum;
  port: number;
  database: {
    type: DatabaseTypeEnum;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    synchronize: boolean;
    autoLoadEntities: boolean;
  };
  meili: {
    host: string;
    apiKey: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  OAuthConfig: {
    google: {
      clientID: string;
      clientSecret: string;
      callbackURL: string;
    };
  };
};

export enum OAuthProvider {
  GOOGLE = 'GOOGLE',
}

export enum ProcessEnvEnum {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  GLOBAL_PREFIX = 'GLOBAL_PREFIX',

  DATABASE_HOST = 'DATABASE_HOST',
  DATABASE_PORT = 'DATABASE_PORT',
  DATABASE_USER = 'DATABASE_USER',
  DATABASE_PASSWORD = 'DATABASE_PASSWORD',
  DATABASE_NAME = 'DATABASE_NAME',

  MEILI_HOST = 'MEILI_HOST',
  MEILI_PORT = 'MEILI_PORT',
  MEILI_KEY = 'MEILI_KEY',

  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRATION_TIME = 'JWT_EXPIRATION_TIME',

  GOOGLE_CLIENT_ID = 'GOOGLE_CLIENT_ID',
  GOOGLE_CLIENT_SECRET = 'GOOGLE_CLIENT_SECRET',
  GOOGLE_CALLBACK_URL = 'GOOGLE_CALLBACK_URL',

  AT_SECRET = 'AT_SECRET',
  RT_SECRET = 'RT_SECRET',

  SESSION_SECRET = 'SESSION_SECRET',
}
