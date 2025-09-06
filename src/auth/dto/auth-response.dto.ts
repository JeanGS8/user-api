import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { CreateRoleDto } from "src/role/dto/create-role.dto";

export class AuthResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  role: CreateRoleDto;
}