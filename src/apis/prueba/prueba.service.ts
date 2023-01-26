import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { IResponse } from 'src/interfaces/IResponse';

@Injectable()
export class CorreoService {
  constructor(
    @InjectConnection('agrotasks')
    private connection: Connection,
    @InjectConnection('agroshippingorders')
    private connection2: Connection,
  ) {}

  async list(limit: number, order: any): Promise<IResponse> {
    const response = {
      error: true,
      message: 'Existen problemas con el servicio de listar todos los datos.',
      response: {},
      status: 500,
    };

    try {
      const findData = await this.connection.db
        .collection('agrotasks')
        .aggregate([
          {
            $sort: { 'tipo.code': 1 },
          },
          {
            $group: {
              _id: { shippingOrder: '$agroShippingOrderId', order: '$order' },
              originName: { $first: '$point.name' },
              destinyName: { $last: '$point.name' },
              weightCarga: { $first: '$weight' },
              weightDescarga: { $last: '$weight' },
            },
          },
          {
            $lookup: {
              from: 'agroshippingorders',
              localField: '_id.shippingOrder',
              foreignField: '_id',
              as: 'agroshippingorders_docs',
            },
          },
        ])
        .toArray();

      let condi = 0;
      const arrayResult = [];
      while (findData[condi] != undefined) {
        let status = null;
        let nameCompany = null;
        let nameConductor = null;
        if (findData[condi].agroshippingorders_docs.length > 0) {
          if (findData[condi].agroshippingorders_docs[0].status.length > 0) {
            const dataStatus =
              findData[condi].agroshippingorders_docs[0].status;
            const condicion = dataStatus.length - 1;
            status =
              findData[condi].agroshippingorders_docs[0].status[condicion]
                ?.statusName;
          }
          nameCompany =
            findData[condi].agroshippingorders_docs[0]?.company?.companyName;
          nameConductor = `${findData[condi].agroshippingorders_docs[0]?.assignment?.firstName} ${findData[condi].agroshippingorders_docs[0]?.assignment?.lastName}`;
        }

        let diferencia = 0;
        if (
          findData[condi].weightCarga == null ||
          findData[condi].weightDescarga == null
        ) {
          diferencia =
            findData[condi].weightCarga - findData[condi].weightDescarga;
        }

        const data = {
          originName: findData[condi]?.originName,
          destinyName: findData[condi]?.destinyName || '',
          weight: diferencia,
          status,
          nameCompany,
          nameConductor,
        };

        arrayResult.push(data);
        condi++;
      }

      response.error = false;
      response.message = 'Se logró obtener todos los datos correctamente';
      response.response = arrayResult;
      response.status = 201;
    } catch (error) {
      response.error = true;
      response.message = 'No se pudo realizar la solicitud.';
      response.response = {
        errors: { data: [`${error.message}`] },
      };
      response.status = 422;
    }

    return response;
  }
}
