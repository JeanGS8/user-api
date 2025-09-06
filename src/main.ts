import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initialSeed } from './seeds/initial.seed';
import { Repository } from 'typeorm';
import { Role } from './role/entities/role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from './usuario/entities/usuario.entity';
import { Bcrypt } from './auth/bcrypt/bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const roleRepository = app.get<Repository<Role>>(getRepositoryToken(Role));
  const usuarioRepository = app.get<Repository<Usuario>>(getRepositoryToken(Usuario));
  const bcrypt = app.get(Bcrypt);
  await initialSeed(roleRepository, usuarioRepository, bcrypt);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
