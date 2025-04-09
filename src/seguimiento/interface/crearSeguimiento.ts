import { Types } from 'mongoose';

export interface CrearSeguimiento {
  tracking: string;

  sector: string;

  fechaTracking: Date;

  reproceso: string;

  venta: Types.ObjectId;
}
