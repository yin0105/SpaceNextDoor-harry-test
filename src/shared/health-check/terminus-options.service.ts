import { HealthCheckError } from '@godaddy/terminus';
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  HealthIndicatorResult,
  TerminusEndpoint,
  TerminusModuleOptions,
  TerminusOptionsFactory,
} from '@nestjs/terminus';
import { Sequelize } from 'sequelize-typescript';

import { sequelizeProvider } from '../constant/app.constant';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
  constructor(
    @Inject(sequelizeProvider) private readonly sequelize: Sequelize,
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () => {
          const result: HealthIndicatorResult = {
            'Database service': {
              status: 'up',
            },
          };
          try {
            await this.sequelize.authenticate();
            Logger.log('Database is up');
            return result;
          } catch (err) {
            throw new HealthCheckError('Database is down', err);
          }
        },
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}
