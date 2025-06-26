import { Prop } from '@nestjs/mongoose';
import { flagE } from '../enum/FlagEnum';

export class BaseSchema {
  @Prop({ type: String, enum: flagE, default: flagE.nuevo })
  flag: string;

  @Prop({ type: Date, default: () => Date.now() })
  fecha: Date;
}
