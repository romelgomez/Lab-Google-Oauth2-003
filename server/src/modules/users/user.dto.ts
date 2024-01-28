import { IsString, IsUUID, IsEmail, IsOptional, IsDate } from 'class-validator';

export class UserDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  familyName?: string;

  @IsString()
  @IsOptional()
  givenName?: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  accessToken?: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsDate()
  @IsOptional()
  created?: Date;

  @IsDate()
  @IsOptional()
  modified?: Date;

  @IsDate()
  @IsOptional()
  deleted?: Date;
}
