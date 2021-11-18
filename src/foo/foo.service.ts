import { Injectable, Logger } from '@nestjs/common';

import { Foo } from './../graphql.schema';

@Injectable()
export class FooService {
  constructor(private readonly logger: Logger) {}

  getOne(): Foo {
    this.logger.log('GetOne func is called');
    return {
      id: 1,
      foo: 'Foo',
      bar: 'Bar',
    };
  }
}
