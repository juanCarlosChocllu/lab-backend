import {  HttpStatus, Injectable } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Venta } from './schema/venta.schema';
import { Model, PipelineStage } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { flagE } from 'src/core/enum/FlagEnum';
import { SeguimientoService } from 'src/seguimiento/seguimiento.service';
import { diferencia } from 'src/core/util/tiempoTranscurrido';
import { ListarSeguimientoI } from 'src/seguimiento/interface/listarSeguimiento';
import { PaginadorDto } from 'src/core/dto/paginadorDto';


@Injectable()
export class VentaService {

  constructor (
    @InjectModel(Venta.name) private readonly venta:Model<Venta>,
    private readonly seguimientoService:SeguimientoService

) {}
  registrarVenta(crearVentaI: CreateVentaDto) {
    return  this.venta.create(crearVentaI)
  }

  async verificarVentaExiste(pedido:string) {
    const venta = await  this.venta.exists({flag:flagE.nuevo, pedido:pedido})
    return venta
  }

  async tiemposEntrega(paginadorDto:PaginadorDto) {
 
  
    const ventaData = []

    const pipeline:PipelineStage[] = [
      {$match:{flag:flagE.nuevo}},
      {
        $lookup:{
          from:'Producto',
          foreignField:'_id',
          localField:'producto',
          as:'producto'
        }
      },
      {$unwind:{path:'$producto', preserveNullAndEmptyArrays:false}},
      {
        $project:{
          estado:1,
          pedido:1,
          producto:'$producto.codigo',
          descripcion:'$producto.descripcion',
          fechaVenta:1
        }
      },
      {
        $facet:{
          data:[
            {
              $skip: (paginadorDto.pagina -1) * paginadorDto.limite
            },
            {
              $limit:paginadorDto.limite
            }
          ],
          documentos :[
            {$count:'total'}
          ] 
        }
      }

    ]
    const ventas = await this.venta.aggregate(pipeline)    
     for (const venta of ventas[0].data) {
      
      const seguimiento = (await this.seguimientoService.seguimientoVenta(venta._id)).sort((a,b) => a.fechaTracking.getTime() - b.fechaTracking.getTime()) //se esta ordenando
      
      const tiempoTranscurridoTransporte =  this.obtenerTiempoTransporte(seguimiento)
      const  obtenerTiemposDeTracking = this.obtenerTiemposDeTracking(seguimiento)
      const data ={
          estado:venta.estado,
          fechaVenta:venta.fechaVenta,
          pedido:venta.pedido,
          producto:venta.producto,
          descripcion:venta.descripcion,
          timpoTranscurrido: obtenerTiemposDeTracking,
          timpoTranscurridoTransporte:tiempoTranscurridoTransporte,
          seguimiento: seguimiento,  
      }
      ventaData.push(data)
  
  }     
  const documentos = ventas[0].documentos[0]  ? ventas[0].documentos[0].total :1

  
  const paginas = Math.ceil(( documentos/paginadorDto.limite ))
    
    return {status: HttpStatus.OK,  paginas:paginas, data:ventaData};
  }

  
  private  obtenerTiempoTransporte(seguimientos:ListarSeguimientoI[]) {
    let tiempoTranscurridoTransporte:string
    let fechaDespacho:Date
    let fechaEntrega:Date
    for (const seguimiento of seguimientos) {
       if(seguimiento.tracking == 'Despachado') {
          fechaDespacho=seguimiento.fechaTracking
       }

       if(seguimiento.tracking == 'Entregado Sucursal/Cliente'){
        fechaEntrega = seguimiento.fechaTracking
       }
    }
    if(fechaDespacho && fechaEntrega) {
      const {dias,horasRestantes,minutosRestantes,totalHoras} = diferencia(fechaDespacho, fechaEntrega)
      tiempoTranscurridoTransporte= dias > 0 ? `${dias} dia(s) ${horasRestantes}h` : `${totalHoras}h ${minutosRestantes}m`;
      
    }
    return  tiempoTranscurridoTransporte
  }

  private obtenerTiemposDeTracking(seguimiento:ListarSeguimientoI[]){
    const fechaInicio = seguimiento[0].fechaTracking
    const fechaFin =seguimiento[seguimiento.length - 1].fechaTracking
    const {dias,horasRestantes,minutosRestantes,totalHoras} = diferencia(fechaInicio, fechaFin)
    return   dias > 0 ? `${dias} dia(s) ${horasRestantes}h` : `${totalHoras}h ${minutosRestantes}m`
  } 







  findOne(id: number) {
    return `This action returns a #${id} venta`;
  }

  update(id: number, updateVentaDto: UpdateVentaDto) {
    return `This action updates a #${id} venta`;
  }

  remove(id: number) {
    return `This action removes a #${id} venta`;
  }
}
