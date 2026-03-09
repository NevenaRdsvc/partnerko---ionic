import { Test, TestingModule } from '@nestjs/testing';
import { KompanijaController } from './kompanija.controller';
import { KompanijaService } from './kompanija.service';

describe('KompanijaController', () => {
  let controller: KompanijaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KompanijaController],
      providers: [KompanijaService],
    }).compile();

    controller = module.get<KompanijaController>(KompanijaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
