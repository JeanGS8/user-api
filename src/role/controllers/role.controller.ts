import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { Role } from '../entities/role.entity';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id', ParseIntPipe)
    id: number
  ): Promise<Role> {
    const role = await this.roleService.findById(id);
    if(!role) throw new Error('Role não encontrada');
    return role;
  }
}
