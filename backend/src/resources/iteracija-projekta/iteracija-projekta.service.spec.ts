import { Test, TestingModule } from '@nestjs/testing';
import { IteracijaProjektaService } from './iteracija-projekta.service';

describe('IteracijaProjektaService', () => {
  let service: IteracijaProjektaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IteracijaProjektaService],
    }).compile();

    service = module.get<IteracijaProjektaService>(IteracijaProjektaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
