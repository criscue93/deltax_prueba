import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { IResponse } from 'src/interfaces/IResponse';
import { Mail, MailDocument } from 'src/schemas/mail.schema';
import { correoDTO } from './prueba.dto';
import * as cryptojs from 'crypto-js';

@Injectable()
export class CorreoService {
  constructor(
    @InjectConnection('test.cats')
    private connection: Connection,
  ) {}

  async listMail(): Promise<IResponse> {
    const response = {
      error: true,
      message: 'Existen problemas con el servicio de listar todos los correos.',
      response: {},
      status: 500,
    };

    try {
      //const data = await this.emailDocument.find({ estado: 1 }).exec();
      const example = await this.connection.model.arguments.find();
      console.log(example);

      response.error = false;
      response.message = 'Se logró obtener todos los correos correctamente';
      response.response = example;
      response.status = 201;
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { email: [`${error.message}`] },
      };
      response.status = 422;
    }

    return response;
  }

  // async insertMail(data: correoDTO): Promise<IResponse> {
  //   const response = {
  //     error: true,
  //     message: 'Existen problemas con el servicio de insertar un correo.',
  //     response: {},
  //     status: 500,
  //   };

  //   try {
  //     const encryptPassword = await cryptojs.AES.encrypt(
  //       JSON.stringify(data.password),
  //       process.env.KEY,
  //     ).toString();
  //     const dataInsert = {
  //       correo: data.correo,
  //       password: encryptPassword,
  //       contador: 0,
  //       numerador: 0,
  //       estado: 1,
  //     };
  //     const insert = new this.emailDocument(dataInsert);
  //     const insertar = await insert.save();

  //     response.error = false;
  //     response.message = 'Se logró insertar el correo correctamente.';
  //     response.response = insertar['_id'];
  //     response.status = 201;
  //   } catch (error) {
  //     response.error = true;
  //     response.message = 'No se pudo realizar la solicitud.';
  //     response.response = {
  //       errors: { email: [`${error.message}`] },
  //     };
  //     response.status = 422;
  //   }

  //   return response;
  // }

  // async updateMail(id: string, data: correoDTO): Promise<IResponse> {
  //   const response = {
  //     error: true,
  //     message: 'Existen problemas con el servicio de editar un correo.',
  //     response: {},
  //     status: 500,
  //   };

  //   try {
  //     const encryptPassword = await cryptojs.AES.encrypt(
  //       JSON.stringify(data.password),
  //       process.env.KEY,
  //     ).toString();
  //     const dataUpdate = await this.emailDocument
  //       .findByIdAndUpdate(id, {
  //         correo: data.correo,
  //         password: encryptPassword,
  //       })
  //       .exec();

  //     response.error = false;
  //     response.message = 'Se logró editar el correo correctamente.';
  //     response.response = dataUpdate['_id'];
  //     response.status = 201;
  //   } catch (error) {
  //     response.error = true;
  //     response.message = 'No se pudo realizar la solicitud.';
  //     response.response = {
  //       errors: { email: [`${error.message}`] },
  //     };
  //     response.status = 422;
  //   }

  //   return response;
  // }

  // async statusMail(id: string): Promise<IResponse> {
  //   const response = {
  //     error: true,
  //     message: 'Existen problemas con el servicio de editar un correo.',
  //     response: {},
  //     status: 500,
  //   };

  //   try {
  //     const dataEmail = await this.emailDocument.findById(id);

  //     let estado;
  //     if (dataEmail['estado'] == 0) {
  //       estado = 1;
  //     } else if (dataEmail['estado'] == 1) {
  //       estado = 0;
  //     }
  //     const dataUpdate = await this.emailDocument
  //       .findByIdAndUpdate(id, {
  //         estado,
  //       })
  //       .exec();

  //     response.error = false;
  //     response.message = 'Se logró cambiar el estado del correo correctamente.';
  //     response.response = dataUpdate['_id'];
  //     response.status = 201;
  //   } catch (error) {
  //     response.error = true;
  //     response.message = 'No se pudo realizar la solicitud.';
  //     response.response = {
  //       errors: { email: [`${error.message}`] },
  //     };
  //     response.status = 422;
  //   }

  //   return response;
  // }
}
