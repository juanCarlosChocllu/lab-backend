import { Test, TestingModule } from '@nestjs/testing';
import { TipoColorController } from './tipo-color.controller';
import { TipoColorService } from './tipo-color.service';

describe('TipoColorController', () => {
  let controller: TipoColorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoColorController],
      providers: [TipoColorService],
    }).compile();

    controller = module.get<TipoColorController>(TipoColorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
