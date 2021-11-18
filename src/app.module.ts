import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TerminusModule } from '@nestjs/terminus';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import _ from 'lodash';

import appConfig from './config/app.config';
import { DbModule } from './db/db.module';
import { FooModule } from './foo/foo.module';
import { APOLLO_REPORT_INTERVAL_MS } from './shared/constant/app.constant';
import { HttpExceptionFilter } from './shared/exception-filter/http-exception.filter';
import { TerminusOptionsService } from './shared/health-check/terminus-options.service';
import { TimeoutInterceptor } from './shared/interceptor/timeout.interceptor';

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    FooModule,
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        include: [],
        typePaths: ['./**/**/*.graphql'],
        installSubscriptionHandlers: true,
        context: ({ request }) => ({ req: request }),
        introspection: true,
        tracing: true,
        playground: true,
        debug: configService.get<string>('app.nodeEnv') === 'development',
        engine: {
          graphVariant: configService.get<string>('app.nodeEnv'),
          apiKey: configService.get<string>('app.apolloEngineApiKey'),
          reportIntervalMs: APOLLO_REPORT_INTERVAL_MS,
          sendVariableValues: {
            all: true,
          },
          sendHeaders: {
            exceptNames: ['Authorization', 'authorization'],
          },
        },
        resolverValidationOptions: {
          requireResolversForResolveType: false,
        },
        resolvers: {
          JSON: GraphQLJSON,
          JSONObject: GraphQLJSONObject,
        },
        formatError: (error) => {
          try {
            error.message = JSON.parse(error.message);
          } catch (e) {
            // Empty
          }
          return {
            ...error,
            message: error.message,
            code: _.get(error, 'extensions.exception.title', 'UNKNOWN'),
            locations: error.locations,
            path: error.path,
          };
        },
        formatResponse: (response) => response,
      }),
      inject: [ConfigService],
    }),
    TerminusModule.forRootAsync({
      imports: [DbModule],
      useClass: TerminusOptionsService,
      inject: [Logger],
    }),
  ],

  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
