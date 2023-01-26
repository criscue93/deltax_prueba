import { Module } from '@nestjs/common';
import { CorreoController } from './prueba/prueba.controller';
import { CorreoService } from './prueba/prueba.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_MAIL, {
      connectionName: 'agrotasks',
    }),
    MongooseModule.forRoot(process.env.MONGO_MAIL, {
      connectionName: 'agroshippingorders',
    }),
  ],
  controllers: [CorreoController],
  providers: [CorreoService],
})
export class ApiModule {}
