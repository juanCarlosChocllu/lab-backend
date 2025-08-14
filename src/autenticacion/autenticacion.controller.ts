import { Body, Get,Controller, HttpCode, HttpStatus, Post, Res, Req, BadRequestException } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionDto } from './dto/Autenticacion.dto';
import { Response } from 'express';
import { PUBLICO } from 'src/core/decorators/decorators';
import {Request} from 'express'
import { HttpStatusCode } from 'axios';
@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @PUBLICO()
  @Post()
  @HttpCode(HttpStatus.OK)
  async autenticacion(
    @Res() res: Response,
    @Body() autenticacionDto: AutenticacionDto,
  ) {
    try {
      const { token } =
        await this.autenticacionService.auntenticacion(autenticacionDto);
      if (token) {
        res.cookie('ctx', token, {
          httpOnly: true,
          secure: true, // Cambiar a true en producción con HTTPS
          maxAge: 1000 * 60 * 60 * 4,
          sameSite: 'strict',
          path: '/',
        });
        return res.json({ status: HttpStatus.OK });
      }
    } catch (error) {
      throw error;
    }
  }

  @Get('session')
   verificarAuntenticaicon(@Req ()request :Request){
     const token = request.cookies['ctx']
     if(token){
      return {autenticacion:true}
     }
     return {autenticacion:false}
  }
  @HttpCode(HttpStatusCode.Ok)
  @Get('logout')
   cerrarSession(@Res ()res :Response){
     try {
      res.clearCookie('ctx', {
          httpOnly: true,
          secure: true, // Cambiar a true en producción con HTTPS
          maxAge: 1000 * 60 * 60 * 4,
          sameSite: 'strict',
          path: '/',
        });
        return res.json({status:HttpStatus.OK})
     } catch (error) {
      throw new BadRequestException()
      
     }
  }






}
