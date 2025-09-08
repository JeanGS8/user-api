import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Bcrypt } from 'src/auth/bcrypt/bcrypt';
import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';
import { Endereco } from 'src/endereco/entities/endereco.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,

    private bcrypt: Bcrypt
  ) {}

  async findById(id: number, usuarioLogado: AuthResponseDto): Promise<Partial<Usuario>> {
    const response = await this.usuarioRepository.findOne({
      where: {
        id
      },
      relations: {
        role: true,
        endereco: true
      }
    });

    if (!response)
      throw new Error('Usuário não encontrado');

    if(usuarioLogado.role == "ADMIN" || usuarioLogado.id == id)
      return response;

    const {senha, ...rest} = response;
    return rest;
  }

  async findByEmail(email: string): Promise<Usuario> {
    const response = await this.usuarioRepository.findOne({
      where: {
        email
      },
      relations: {
        role: true,
        endereco: true
      }
    });

    if (!response) throw new Error('Usuário não encontrado');
    
    return response;
  }

  async findAll(): Promise<Partial<Usuario>[]> {
    const usuarios = await this.usuarioRepository.find({
      order: {
        id: 'ASC'
      },
      relations: {
        role: true,
        endereco: true
      }
    });

    return usuarios.map(({senha, ...rest}) => rest)
  }

  async create(dto: CreateUsuarioDto, usuarioLogado: AuthResponseDto): Promise<Usuario> {
    if(usuarioLogado.role !== 'ADMIN')
      throw new Error('Você não tem permissão para criar um usuário');

    const role = await this.roleRepository.findOneBy({ id: dto.roleId });
    
    if (!role)
        throw new Error('Role não encontrada');

    const existingUser = await this.usuarioRepository.findOneBy({ email: dto.email });
    if (existingUser)
      throw new Error('Email já está em uso');

    const usuario = this.usuarioRepository.create({
      ...dto,
      senha: await this.bcrypt.criptografarSenha(dto.senha),
      role: role
    });

    return this.usuarioRepository.save(usuario);
  }

  async update(id: number, dto: UpdateUsuarioDto, usuarioLogado: AuthResponseDto): Promise<Usuario> {
    if(usuarioLogado.id !== id && usuarioLogado.role !== 'ADMIN')
      throw new Error('Você não tem permissão para atualizar este usuário');

    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario)
      throw new Error('Usuario não encontrado');

    const existingUser = await this.usuarioRepository.findOneBy({ email: dto.email });
    if (existingUser && existingUser.id !== id)
      throw new Error('Email já está em uso');

    Object.assign(usuario, dto);

    if(dto.roleId) {
      const role = await this.roleRepository.findOneBy({ id: dto.roleId });
      
      if (!role)
        throw new Error('Role  não encontrada');
      usuario.role = role;
    }
    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number, usuarioLogado: AuthResponseDto): Promise<void> {
    if(usuarioLogado.id !== id && usuarioLogado.role !== 'ADMIN')
      throw new Error('Você não tem permissão para deletar este usuário');

    const usuario = await this.usuarioRepository.findOneBy({id});
    if (!usuario)
      throw new Error('Usuário não encontrado');
    await this.enderecoRepository.delete({ usuario: { id } });
    await this.usuarioRepository.delete(id);
  }
}
