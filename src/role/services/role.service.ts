import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async findById(id: number): Promise<Role> {
    const response = await this.roleRepository.findOne({
      where: {
        id
      }
    });

    if (!response) throw new Error('Role não encontrada');

    return response;
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find({
      order: {
        id: 'ASC'
      },
    });
  }
}
