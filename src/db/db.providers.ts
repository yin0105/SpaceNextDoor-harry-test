import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';

import { sequelizeProvider } from '../shared/constant/app.constant';

export const databaseProviders = [
  {
    provide: sequelizeProvider,
    useFactory: async (configService: ConfigService): Promise<Sequelize> => {
      const sequelize = new Sequelize({
        dialect: configService.get<Dialect>('app.db.dialect'),
        host: configService.get<string>('app.db.host'),
        port: configService.get<number>('app.db.port'),
        username: configService.get<string>('app.db.username'),
        password: configService.get<string>('app.db.password'),
        database: configService.get<string>('app.db.name'),
      });
      sequelize.addModels([]);
      await sequelize.sync({
        // force: true,
      });
      return sequelize;
    },
    inject: [ConfigService],
  },
];
