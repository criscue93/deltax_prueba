import { Module } from '@nestjs/common';
import { CorreoController } from './prueba/prueba.controller';
import { CorreoService } from './prueba/prueba.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Mail, MailSchema } from 'src/schemas/mail.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(process.env.MONGO_MAIL),
    // MongooseModule.forFeature([
    //   {
    //     name: Mail.name,
    //     schema: MailSchema,
    //   },
    // ]),
    MongooseModule.forRoot(process.env.MONGO_MAIL, {
      connectionName: 'test.cats',
    }),
  ],
  controllers: [CorreoController],
  providers: [CorreoService],
})
export class ApiModule {}
