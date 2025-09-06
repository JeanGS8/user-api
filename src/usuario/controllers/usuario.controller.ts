import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createUsuarioDto: CreateUsuarioDto,
    @Req() req: any
  ): Promise<Usuario> {
    const usuarioLogado: AuthResponseDto = req.user;
    return await this.usuarioService.create(createUsuarioDto, usuarioLogado);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Usuario> {
    const usuario = await this.usuarioService.findById(+id);
    if(!usuario) throw new Error('Usuário não encontrado');
    return usuario;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Req() req: any
  ) {
    const usuarioLogado: AuthResponseDto = req.user;
    return await this.usuarioService.update(id, updateUsuarioDto, usuarioLogado);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any
  ): Promise<void> {
    const usuarioLogado: AuthResponseDto = req.user;
    return await this.usuarioService.remove(id, usuarioLogado);
  }
}
