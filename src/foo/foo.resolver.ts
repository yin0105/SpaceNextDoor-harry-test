import { Mutation, Query, Resolver } from '@nestjs/graphql';

import { Foo } from '../graphql.schema';
import { FooService } from './foo.service';

@Resolver('Foo')
export class FooResolver {
  constructor(private fooService: FooService) {}

  @Query('foo')
  async foo(): Promise<Foo> {
    return this.fooService.getOne();
  }

  @Mutation('addFoo')
  async addFoo(): Promise<Foo> {
    return this.fooService.getOne();
  }
}
