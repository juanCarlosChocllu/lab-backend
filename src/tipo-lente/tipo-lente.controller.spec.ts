import { Test, TestingModule } from '@nestjs/testing';
import { TipoLenteController } from './tipo-lente.controller';
import { TipoLenteService } from './tipo-lente.service';

describe('TipoLenteController', () => {
  let controller: TipoLenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoLenteController],
      providers: [TipoLenteService],
    }).compile();

    controller = module.get<TipoLenteController>(TipoLenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
