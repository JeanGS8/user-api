import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body()
    createUsuarioDto: CreateUsuarioDto
  ): Promise<Usuario> {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id', ParseIntPipe)
    id: number
  ): Promise<Usuario> {
    const usuario = await this.usuarioService.findById(+id);
    if(!usuario) throw new Error('Usuário não encontrado');
    return usuario;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateUsuarioDto: UpdateUsuarioDto
  ) {
    return await this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe)
    id: number
  ): Promise<void> {
    return await this.usuarioService.remove(id);
  }
}
