import { Module } from '@nestjs/common';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Role } from 'src/role/entities/role.entity';
import { Bcrypt } from 'src/auth/bcrypt/bcrypt';
import { Endereco } from 'src/endereco/entities/endereco.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Role, Endereco])],
  providers: [UsuarioService, Bcrypt],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
