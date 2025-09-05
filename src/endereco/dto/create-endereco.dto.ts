import { IsNotEmpty, IsNumber, Length } from "class-validator"

export class CreateEnderecoDto {
  @IsNotEmpty()
  @Length(1, 100)
  endereco: string

  @IsNotEmpty()
  @IsNumber()
  numero: number

  @Length(0, 50)
  complemento?: string

  @IsNotEmpty()
  @Length(9, 9)
  cep: string

  @IsNotEmpty()
  @Length(1, 100)
  cidade: string

  @IsNotEmpty()
  @Length(1, 20)
  estado: string

  @IsNotEmpty()
  @IsNumber()
  usuarioId: number;
}
