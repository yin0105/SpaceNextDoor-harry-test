import { Test } from '@nestjs/testing';

import { FooService } from './foo.service';

describe('FooService', () => {
  let service: FooService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FooService],
    }).compile();

    service = module.get<FooService>(FooService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
