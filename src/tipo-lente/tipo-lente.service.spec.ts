import { Test, TestingModule } from '@nestjs/testing';
import { TipoLenteService } from './tipo-lente.service';

describe('TipoLenteService', () => {
  let service: TipoLenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoLenteService],
    }).compile();

    service = module.get<TipoLenteService>(TipoLenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
