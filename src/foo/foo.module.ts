import { Logger, Module } from '@nestjs/common';

import { FooResolver } from './foo.resolver';
import { FooService } from './foo.service';

@Module({
  imports: [],
  providers: [FooResolver, FooService, Logger],
})
export class FooModule {}
