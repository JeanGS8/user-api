import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async findById(id: number): Promise<Usuario> {
    const response = await this.usuarioRepository.findOne({
      where: {
        id
      },
      relations: {
        role: true
      }
    });

    if (!response) throw new Error('Usuário não encontrado');

    return response;
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations: {
        role: true
      }
    });
  }

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuarioRepository.create({
      nome: dto.nome,
      telefone: dto.telefone,
      email: dto.email,
      idade: dto.idade,
      peso: dto.peso,
      etnia: dto.etnia
    });

    const role = await this.roleRepository.findOneBy({ id: dto.roleId });
    if (!role) throw new Error('Role não encontrada');
    usuario.role = role;

    return this.usuarioRepository.save(usuario);
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) throw new Error('Usuario não encontrado');

    Object.assign(usuario, dto);

    if(dto.roleId) {
      const role = await this.roleRepository.findOneBy({ id: dto.roleId });
      if (!role) throw new Error('Role  não encontrada');
      usuario.role = role;
    }

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOneBy({id});
    if (!usuario) throw new Error('Usuário não encontrado');
    await this.usuarioRepository.delete(id);
  }
}
