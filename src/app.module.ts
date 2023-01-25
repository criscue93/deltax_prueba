import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './apis/api.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_MAIL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
