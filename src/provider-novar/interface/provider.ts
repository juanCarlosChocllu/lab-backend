export interface TrackingI {
  IdTracking: number;
  Identificador: number;
  Factura: string;
  Detalle: string;
  NombreCuenta: string;
  FechaAlta: Date;
  NombreEsArg: string;
}

export interface TrackingActividadI {
  FechaAlta: Date;
  NombreOperador: string;
  NombreSector: string;
  NombreEventoEsArg: string;
  IdTracking: number;
  IdTrackingActividad: number;
  IsReproceso:number
}
