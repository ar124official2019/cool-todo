import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([User]),

    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>(`SECRET`),
        };
      },

      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],

  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class SharedModule {}
