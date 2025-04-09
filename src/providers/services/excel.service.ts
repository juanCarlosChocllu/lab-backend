import { HttpStatus, Injectable } from '@nestjs/common';
import * as exceljs from 'exceljs';
import * as path from 'path';
import { dataExcelI } from '../interface/dataExcel';
import { log } from 'console';
import { VentaService } from 'src/venta/venta.service';
import { SeguimientoService } from 'src/seguimiento/seguimiento.service';
import { CrearSeguimiento } from 'src/seguimiento/interface/crearSeguimiento';
import { CrearVentaI } from 'src/venta/interface/crearVentaI';
import { Types } from 'mongoose';
import { CrearProductoI } from 'src/producto/interface/crearProducto';
import { ProductoService } from 'src/producto/producto.service';
import { SucursalService } from 'src/sucursal/sucursal.service';

@Injectable()
export class ExcelService {
    constructor(
        private readonly ventaService: VentaService,
        private readonly seguimiento: SeguimientoService,
        private readonly productoService: ProductoService,
        private readonly sucursalService: SucursalService,
    ) { }

    async lectura(archivo: string) {
        let ruta: string = path.join(__dirname, `../../../reports/${archivo}`);
        let workbook = new exceljs.stream.xlsx.WorkbookReader(ruta, {
            entries: 'emit',
        });
        for await (const hojas of workbook) {
            this.regitsrarData(hojas);
        }
        return { status: HttpStatus.OK };
    }

    private formatoFecha(serial: number): Date {
        if (serial) {
            const baseDate = new Date(1900, 0, 1);
            baseDate.setDate(baseDate.getDate() + serial - 1);
            baseDate.setMilliseconds((serial % 1) * 24 * 60 * 60 * 1000);
            baseDate.setHours(baseDate.getHours()-4)
            return baseDate;
        }
        return null;
    }

    private async regitsrarData(hojas: exceljs.stream.xlsx.WorksheetReader) {
        let contador = 0;
        for await (const filas of hojas) {
            contador++;
            if (contador === 1) continue;
            const pedido = String(filas.getCell(1).value);
            const sucursal = String(filas.getCell(15).value)
            await this.guardarSucursal(sucursal);
            const venta = await this.ventaService.verificarVentaExiste(pedido);
            if (venta) {
                const seguimiento: CrearSeguimiento = {
                    tracking: String(filas.getCell(8).value),
                    reproceso: String(filas.getCell(11).value),
                    fechaTracking: this.formatoFecha(Number(filas.getCell(10).value)),
                    sector: String(filas.getCell(9).value),
                    venta: venta._id,
                };
                await this.seguimiento.crearSeguimiento(seguimiento);
            } else {
              
                const sucursalEncontrada = await  this.sucursalService.verificarSucursal(sucursal)

                if(sucursalEncontrada){
                    const productoData: CrearProductoI = {
                        codigo: String(filas.getCell(16).value),
                        descripcion: String(filas.getCell(17).value),
                    };
                    const producto = await this.productoService.crearProducto(productoData);
    
                    const ventaData: CrearVentaI = {
                        pedido: pedido,
                        fechaVenta: this.formatoFecha(Number(filas.getCell(2).value)),
                        producto: producto._id,
                        estado: String(filas.getCell(7).value),
                        sucursal: sucursalEncontrada._id,
                    };
                    const venta = await this.ventaService.registrarVenta(ventaData);
                    const seguimiento: CrearSeguimiento = {
                        tracking: String(filas.getCell(8).value),
                        reproceso: String(filas.getCell(11).value),
                        fechaTracking: this.formatoFecha(Number(filas.getCell(10).value)),
                        sector: String(filas.getCell(9).value),
                        venta: venta._id,
                    };
                    await this.seguimiento.crearSeguimiento(seguimiento);
                }
            }
        }
    }



    private guardarSucursal(sucursal:string) {
        return this.sucursalService.crearSucursal(sucursal)
    }
}
