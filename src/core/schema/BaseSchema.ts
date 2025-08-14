import { Prop } from '@nestjs/mongoose';
import { flagE } from '../enum/FlagEnum';

export class BaseSchema {
  @Prop({ type: String, enum: flagE, default: flagE.nuevo })
  flag: string;

  @Prop({
    type: Date,
    default: function () {
      const date = new Date();
      date.setHours(date.getHours() - 4);
      return date;
    },
  })
  fecha: Date;


  
}
