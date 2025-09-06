import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Endereco } from '../entities/endereco.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>
  ) {}

  async findById(id: number): Promise<Endereco> {
    const response = await this.enderecoRepository.findOne({
      where: {
        id
      },
      relations: {
        usuario: {
          role: true
        }
      }
    });

    if (!response) throw new Error('Endereço não encontrado');
    return response;
  }

  async findAll(): Promise<Endereco[]> {
    return await this.enderecoRepository.find({
      relations: {
        usuario: {
          role: true
        }
      }
    });
  }

  async create(dto: CreateEnderecoDto, usuarioLogado: AuthResponseDto): Promise<Endereco> {
    if(dto.usuarioId !== usuarioLogado.id && usuarioLogado.role.nome !== 'ADMIN')
      throw new Error('Você não tem permissão para criar este endereço');
    
    const usuario = await this.usuarioRepository.findOneBy({id: dto.usuarioId});

    if (!usuario)
      throw new Error('Usuário não encontrado');

    const endereco = this.enderecoRepository.create({
      ...dto,
      usuario: usuario
    });

    return await this.enderecoRepository.save(endereco);
  }

  async update(id: number, dto: UpdateEnderecoDto, usuarioLogado: AuthResponseDto): Promise<Endereco> {
    const endereco = await this.enderecoRepository.findOne({
      where: {
        id
      },
      relations: {
        usuario: true
      }
    });
    if (!endereco)
      throw new Error('Endereço não encontrado');

    if(endereco.usuario.id !== usuarioLogado.id && usuarioLogado.role.nome !== 'admin')
      throw new Error('Você não tem permissão para atualizar este endereço');

    Object.assign(endereco, dto);

    if(dto.usuarioId) {
      const usuario = await this.usuarioRepository.findOneBy({ id: dto.usuarioId });
      if (!usuario)
        throw new Error('Usuário não encontrado');
      endereco.usuario = usuario;
    }

    return this.enderecoRepository.save(endereco);
  }

  async remove(id: number, usuarioLogado: AuthResponseDto): Promise<void> {
    const endereco = await this.enderecoRepository.findOne({
      where: { id },
      relations: { usuario: true }
    });
    if (!endereco)
      throw new Error('Endereço não encontrado');

    if(endereco.usuario.id !== usuarioLogado.id && usuarioLogado.role.nome !== 'admin')
      throw new Error('Você não tem permissão para deletar este endereço');
    await this.enderecoRepository.delete(id);
  }
}
