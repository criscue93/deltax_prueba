import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CorreoService } from './prueba.service';
import { Response } from 'express';

@ApiTags('PRUEBA')
@Controller('api')
export class CorreoController {
  constructor(private readonly correoService: CorreoService) {}

  @Get('/prueba/list/:limit/:order')
  @ApiOperation({ summary: 'Servicio para listar todos los datos.' })
  async list(
    @Res() res: Response,
    @Param('limit') limit: number,
    @Param('order') order: any,
  ) {
    let response = {
      error: true,
      message: 'Existen problemas con el controlador.',
      response: {},
      status: 422,
    };

    try {
      response = await this.correoService.list(limit, order);
    } catch (error) {
      response.error = true;
      response.message = 'Error de validación.';
      response.response = {
        errors: { data: ['No se pudo extraer los datos.'] },
      };
      response.status = 422;
    }

    return res.status(response.status).json(response);
  }
}
