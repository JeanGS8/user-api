import { Module } from '@nestjs/common';
import { EnderecoService } from './services/endereco.service';
import { EnderecoController } from './controllers/endereco.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Endereco, Usuario])],
  providers: [EnderecoService],
  controllers: [EnderecoController],
  exports: [EnderecoService],
})
export class EnderecoModule {}
