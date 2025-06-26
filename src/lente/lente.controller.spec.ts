import { Test, TestingModule } from '@nestjs/testing';
import { LenteController } from './lente.controller';
import { LenteService } from './lente.service';

describe('LenteController', () => {
  let controller: LenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LenteController],
      providers: [LenteService],
    }).compile();

    controller = module.get<LenteController>(LenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
