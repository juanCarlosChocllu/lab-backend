import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/core/config/AppConfigService';
import * as sql from 'mssql';
import { TrackingActividadI, TrackingI } from './interface/provider';
import { ProviderSqlServerDto } from './dto/ProviderDto';

@Injectable()
export class ProviderNovarService {
   private db: sql.ConnectionPool;
   constructor(private readonly appConfigService: AppConfigService) {}
   async onModuleInit() {
     await this.conexion();
   }
   async conexion() {
     try {
       this.db = await sql.connect({
         user: this.appConfigService.sqlUser,
         server: this.appConfigService.sqlServer,
         password: this.appConfigService.passwordSql,
         database: this.appConfigService.databaseSql,
         options: {
           encrypt: true,
           trustServerCertificate: false,
         },
       });
       console.log('conexion exitosa sql server');
     } catch (error) {
       console.log('Error de conexion ', error);
     }
   }
 
   async listarTrackings(
     providerSqlServerDto: ProviderSqlServerDto,
   ): Promise<TrackingI[]> {
     try {
       const query: string = `select t.IdTracking , t.Identificador , t.Factura, t.Detalle, t.NombreCuenta, t.FechaAlta, e.NombreEsArg from dbTrackings as t inner join dbEstados as e on t.IdEstado = e.IdEstado where t.FechaAlta >= '${providerSqlServerDto.fechaInicio}' and t.FechaAlta <= '${providerSqlServerDto.fechaFin}'`;
       const { recordset } = await this.db.query<TrackingI[]>(query);
       return recordset;
     } catch (error) {
       throw error;
     }
   }
 
   async obtenerActividadTracking(
     IdTracking: string,
   ): Promise<TrackingActividadI[]> {
     try {
       const query: string = `select FechaAlta , NombreOperador , IsReproceso, NombreSector , NombreEventoEsArg ,IdTracking ,  IdTrackingActividad from dbTrackingsActividades where IdTracking = ${IdTracking} `;
       const { recordset } = await this.db.query<TrackingActividadI[]>(query);
 
       return recordset;
     } catch (error) {
       throw error;
     }
   }
}
