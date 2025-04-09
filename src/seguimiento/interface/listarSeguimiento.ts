import { Types } from "mongoose";

export interface ListarSeguimientoI {
  tracking: string;

  sector: string;

  fechaTracking: Date;

  reproceso: string;

  venta: Types.ObjectId;
}
