import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from './.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [Module, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
