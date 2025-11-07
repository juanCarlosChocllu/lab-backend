import { Types } from 'mongoose';

export interface CrearSeguimiento {
  tracking: string;

  sector: string;

  fechaTracking: Date;

  reproceso: string;
  idTracking: number;

  idTrackingActividad: number;
  venta: Types.ObjectId;

  nombreOperador: string;
}
