import { Test, TestingModule } from '@nestjs/testing';
import { KompanijaService } from './kompanija.service';

describe('KompanijaService', () => {
  let service: KompanijaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KompanijaService],
    }).compile();

    service = module.get<KompanijaService>(KompanijaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
