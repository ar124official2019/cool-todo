import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { TodoModule } from './todo/todo.module';
import { User } from './shared/user.model';
import { Todo } from './todo/todo.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`, `google.env`],
    }),

    /** Sequelize */
    SequelizeModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          dialect: 'mysql',

          host: config.get<string>(`DATABASE_HOST`),
          port: parseInt(config.get<string>(`DATABASE_PORT`)),
          database: config.get<string>(`DATABASE_DB`),
          username: config.get<string>(`DATABASE_USER`),
          password: config.get<string>(`DATABASE_PWD`),

          models: [User, Todo],
        };
      },

      imports: [ConfigModule],
      inject: [ConfigService],
    }),

    AuthModule,

    SharedModule,

    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
