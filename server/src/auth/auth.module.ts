import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './google.strategy';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';
import { SessionGuard } from './session.guard';

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

    PassportModule.register({
      session: true,
    }),
  ],

  providers: [LocalStrategy, GoogleStrategy, SessionSerializer, SessionGuard],
  controllers: [AuthController],
})
export class AuthModule {}
