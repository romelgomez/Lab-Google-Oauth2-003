import { IsString, IsUUID, IsEmail, IsOptional, IsDate } from 'class-validator';

// const user: {
//   id: number;
//   email: string;
//   familyName: string;
//   givenName: string;
//   displayName: string;
//   created: Date;
//   updated: Date;
//   deleted: Date;
// }[]

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

