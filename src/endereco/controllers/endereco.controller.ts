import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { EnderecoService } from '../services/endereco.service';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';
import { Endereco } from '../entities/endereco.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';

@UseGuards(JwtAuthGuard)
@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body()createEnderecoDto: CreateEnderecoDto,
    @Req() req: any
  ): Promise<Endereco> {
    const usuarioLogado: AuthResponseDto = req.user;
    return await this.enderecoService.create(createEnderecoDto, usuarioLogado);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Endereco[]> {
    return await this.enderecoService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Endereco> {
    return await this.enderecoService.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
    @Req() req: any
  ): Promise<Endereco> {
    const usuarioLogado: AuthResponseDto = req.user;
    return await this.enderecoService.update(id, updateEnderecoDto, usuarioLogado);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any
  ): Promise<void> {
    const usuarioLogado: AuthResponseDto = req.user;
    return await this.enderecoService.remove(id, usuarioLogado);
  }
}
