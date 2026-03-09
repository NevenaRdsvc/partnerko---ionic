import { Test, TestingModule } from '@nestjs/testing';
import { MaterijaliController } from './materijali.controller';
import { MaterijaliService } from './materijali.service';

describe('MaterijaliController', () => {
  let controller: MaterijaliController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterijaliController],
      providers: [MaterijaliService],
    }).compile();

    controller = module.get<MaterijaliController>(MaterijaliController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
