import { Test, TestingModule } from '@nestjs/testing';
import { KompanijaIteracijaService } from './kompanija-iteracija.service';

describe('KompanijaIteracijaService', () => {
  let service: KompanijaIteracijaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KompanijaIteracijaService],
    }).compile();

    service = module.get<KompanijaIteracijaService>(KompanijaIteracijaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
