import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { MainModule } from './main/main.module';
import { WorkModule } from './work/work.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), MainModule, WorkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
