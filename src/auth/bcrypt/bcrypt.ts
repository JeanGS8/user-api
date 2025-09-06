import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt{
  async criptografarSenha(senha: string): Promise<string> {
    let salt = 10;
    return await bcrypt.hash(senha, salt);
  }

  async compararSenha(senha: string, hash: string): Promise<boolean> {
    return await bcrypt.compareSync(senha, hash);
  }
}