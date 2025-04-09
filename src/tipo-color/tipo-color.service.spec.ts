import { Test, TestingModule } from '@nestjs/testing';
import { TipoColorService } from './tipo-color.service';

describe('TipoColorService', () => {
  let service: TipoColorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoColorService],
    }).compile();

    service = module.get<TipoColorService>(TipoColorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
