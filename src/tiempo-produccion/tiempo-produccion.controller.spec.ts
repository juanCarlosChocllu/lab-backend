import { Test, TestingModule } from '@nestjs/testing';
import { TiempoProduccionController } from './tiempo-produccion.controller';
import { TiempoProduccionService } from './tiempo-produccion.service';

describe('TiempoProduccionController', () => {
  let controller: TiempoProduccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiempoProduccionController],
      providers: [TiempoProduccionService],
    }).compile();

    controller = module.get<TiempoProduccionController>(TiempoProduccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
