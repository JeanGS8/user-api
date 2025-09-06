import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Bcrypt } from '../bcrypt/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/services/usuario.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const findUser = await this.usuarioService.findByEmail(email);

    if(!findUser)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    const match = await this.bcrypt.compararSenha(senha, findUser.senha);

    if(findUser && match) {
      const { senha, ...result } = findUser;
      return result;
    }

    return null;
  }

  async login(dto: LoginDto){
    const usuario = await this.validateUser(dto.email, dto.senha);
    if(!usuario)
      throw new HttpException('Usuário ou senha inválidos', HttpStatus.UNAUTHORIZED);

    const payload = {
      sub: usuario.id,
      email: dto.email,
      role: usuario.role
    };
    return {
      id: usuario.id,
      email: dto.email,
      role: usuario.role,
      token: `Bearer ${this.jwtService.sign(payload)}`
    }
  }
}
