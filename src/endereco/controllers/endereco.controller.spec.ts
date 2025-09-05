import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoController } from '../controllers/endereco.controller';
import { EnderecoService } from '../services/endereco.service';

describe('EnderecoController', () => {
  let controller: EnderecoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnderecoController],
      providers: [EnderecoService],
    }).compile();

    controller = module.get<EnderecoController>(EnderecoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
