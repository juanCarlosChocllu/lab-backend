import { Test, TestingModule } from '@nestjs/testing';
import { LenteService } from './lente.service';

describe('LenteService', () => {
  let service: LenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LenteService],
    }).compile();

    service = module.get<LenteService>(LenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
