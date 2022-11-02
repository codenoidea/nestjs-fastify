import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './auth/auth.module';
import { MasterUserModule } from './master-user/master-user.module';
import { UsersModule } from './users/users.module';
import { UserLogModule } from './user-log/user-log.module';
import { UserSecessionsModule } from './user-secessions/user-secessions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: false,
      logging: process.env.NODE_ENV === 'development' ? true : false,
    }),
    MailerModule.forRoot({
      transport: {
        service: 'Google',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.SUPPORT_EMAIL,
          pass: process.env.SUPPORT_EMAIL_PASSWORD,
        },
      },

      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    MasterUserModule,
    UsersModule,
    UserLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
