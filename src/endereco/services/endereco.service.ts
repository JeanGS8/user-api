import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Endereco } from '../entities/endereco.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

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

  async create(dto: CreateEnderecoDto): Promise<Endereco> {
    const endereco = this.enderecoRepository.create({
      endereco: dto.endereco,
      numero: dto.numero,
      complemento: dto.complemento,
      cep: dto.cep,
      cidade: dto.cidade,
      estado: dto.estado,
    });

    const usuario = await this.usuarioRepository.findOneBy({id: dto.usuarioId});
    if (!usuario) throw new Error('Usuário não encontrado');
    endereco.usuario = usuario;

    return await this.enderecoRepository.save(endereco);
  }

  async update(id: number, dto: UpdateEnderecoDto): Promise<Endereco> {
    const endereco = await this.enderecoRepository.findOneBy({ id });
    if (!endereco) throw new Error('Endereço não encontrado');

    Object.assign(endereco, dto);

    if(dto.usuarioId) {
      const usuario = await this.usuarioRepository.findOneBy({ id: dto.usuarioId });
      if (!usuario) throw new Error('Usuário não encontrado');
      endereco.usuario = usuario;
    }

    return this.enderecoRepository.save(endereco);
  }

  async remove(id: number): Promise<void> {
    const endereco = await this.enderecoRepository.findOneBy({ id });
    if (!endereco) throw new Error('Endereço não encontrado');
    await this.enderecoRepository.delete(id);
  }
}
