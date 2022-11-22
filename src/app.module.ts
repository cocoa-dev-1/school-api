import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { MainModule } from './main/main.module';
import { WorkModule } from './work/work.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/filters/all-exceptions.filter';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MainModule,
    WorkModule,
    UserModule,
    AuthModule,
    FileModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
