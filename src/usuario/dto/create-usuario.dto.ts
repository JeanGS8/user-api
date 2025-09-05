import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsNumber, Length } from "class-validator";
import { Etnia } from "../enums/etnia.enum";

export enum userRole {
  USUARIO = 1,
  ADMIN = 2
};

export class CreateUsuarioDto {
  @IsNotEmpty()
  @Length(1, 100)
  nome: string;

  @IsNotEmpty()
  @Length(8, 20)
  telefone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  idade: number;

  @IsNotEmpty()
  @IsNumber()
  peso: number;

  @IsNotEmpty()
  @IsEnum(Etnia)
  etnia: Etnia;

  @IsNotEmpty()
  @IsEnum(userRole)
  roleId: userRole;
}
