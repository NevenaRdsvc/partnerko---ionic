import { Test, TestingModule } from '@nestjs/testing';
import { MaterijaliService } from './materijali.service';

describe('MaterijaliService', () => {
  let service: MaterijaliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterijaliService],
    }).compile();

    service = module.get<MaterijaliService>(MaterijaliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
