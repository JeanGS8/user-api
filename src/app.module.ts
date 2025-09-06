import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoModule } from './endereco/endereco.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:  process.env.DATABASE_URL,
      logging: false,
      dropSchema: false,
      //ssl: { rejectUnauthorized: false },
      synchronize: true,
      autoLoadEntities: true
    }),
    UsuarioModule,
    RoleModule,
    EnderecoModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
