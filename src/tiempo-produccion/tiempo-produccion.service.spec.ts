import { Test, TestingModule } from '@nestjs/testing';
import { TiempoProduccionService } from './tiempo-produccion.service';

describe('TiempoProduccionService', () => {
  let service: TiempoProduccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiempoProduccionService],
    }).compile();

    service = module.get<TiempoProduccionService>(TiempoProduccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
