import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { EnderecoService } from '../services/endereco.service';
import { CreateEnderecoDto } from '../dto/create-endereco.dto';
import { UpdateEnderecoDto } from '../dto/update-endereco.dto';
import { Endereco } from '../entities/endereco.entity';

@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body()
    createEnderecoDto: CreateEnderecoDto
  ): Promise<Endereco> {
    return await this.enderecoService.create(createEnderecoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Endereco[]> {
    return await this.enderecoService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id', ParseIntPipe)
    id: number
  ): Promise<Endereco> {
    return await this.enderecoService.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body()
    updateEnderecoDto: UpdateEnderecoDto
  ): Promise<Endereco> {
    return await this.enderecoService.update(id, updateEnderecoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe)
    id: number
  ): Promise<void> {
    return await this.enderecoService.remove(id);
  }
}
