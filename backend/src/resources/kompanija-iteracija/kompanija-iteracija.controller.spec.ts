import { Test, TestingModule } from '@nestjs/testing';
import { KompanijaIteracijaController } from './kompanija-iteracija.controller';
import { KompanijaIteracijaService } from './kompanija-iteracija.service';

describe('KompanijaIteracijaController', () => {
  let controller: KompanijaIteracijaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KompanijaIteracijaController],
      providers: [KompanijaIteracijaService],
    }).compile();

    controller = module.get<KompanijaIteracijaController>(KompanijaIteracijaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
