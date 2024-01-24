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


  // TODO: 
  // - [ ] Add Access and refresh tokens field
  


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
