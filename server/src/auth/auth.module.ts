import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule,
    SharedModule,

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

  providers: [LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
