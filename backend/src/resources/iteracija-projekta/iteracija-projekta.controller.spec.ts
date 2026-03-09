import { Test, TestingModule } from '@nestjs/testing';
import { IteracijaProjektaController } from './iteracija-projekta.controller';
import { IteracijaProjektaService } from './iteracija-projekta.service';

describe('IteracijaProjektaController', () => {
  let controller: IteracijaProjektaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IteracijaProjektaController],
      providers: [IteracijaProjektaService],
    }).compile();

    controller = module.get<IteracijaProjektaController>(
      IteracijaProjektaController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
