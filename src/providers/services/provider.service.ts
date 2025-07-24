import { HttpStatus, Injectable } from '@nestjs/common';
import * as exceljs from 'exceljs';
import * as path from 'path';
import { dataExcelI, VentaApiMia } from '../interface/dataExcel';
import { log } from 'console';
import { VentaService } from 'src/venta/venta.service';
import { SeguimientoService } from 'src/seguimiento/seguimiento.service';
import { CrearSeguimiento } from 'src/seguimiento/interface/crearSeguimiento';
import { VentaI } from 'src/venta/interface/crearVentaI';
import { Types } from 'mongoose';
import { CrearProductoI } from 'src/producto/interface/crearProducto';
import { ProductoService } from 'src/producto/producto.service';
import { SucursalService } from 'src/sucursal/sucursal.service';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';
import { RangoService } from 'src/rango/rango.service';
import { TratamientoService } from 'src/tratamiento/tratamiento.service';
import { MarcaService } from 'src/marca/marca.service';
import { ColorLenteService } from 'src/color-lente/colorLente.service';
import { TipoLenteService } from 'src/tipo-lente/tipoLente.service';
import { MaterialService } from 'src/material/material.service';
import { TipoColorService } from 'src/tipo-color/tipoColor.service';
import { combinacionReceta } from 'src/combinacion-receta/interface/combinacionReceta';
import { CombinacionRecetaService } from 'src/combinacion-receta/combinacion-receta.service';
import { LenteService } from 'src/lente/lente.service';
import { LenteVentaI } from 'src/lente/interface/lenteInterface';
import { apiMia } from 'src/core/config/variablesEntorno';

@Injectable()
export class ProviderService {
  constructor(
    private readonly ventaService: VentaService,
    private readonly seguimiento: SeguimientoService,
    private readonly productoService: ProductoService,
    private readonly sucursalService: SucursalService,
    private readonly httpService: HttpService,
    private readonly rangoService: RangoService,
    private readonly tratamientoService: TratamientoService,
    private readonly marcaService: MarcaService,
    private readonly colorLenteService: ColorLenteService,
    private readonly tipoLenteService: TipoLenteService,
    private readonly materialService: MaterialService,
    private readonly tipoColorService: TipoColorService,
    private readonly combinacionRecetaService: CombinacionRecetaService,
    private readonly lenteService: LenteService,
  ) {}

  async lectura(archivo: string) {
    let ruta: string = path.join(__dirname, `../../../reports/${archivo}`);
    let workbook = new exceljs.stream.xlsx.WorkbookReader(ruta, {
      entries: 'emit',
    });
    for await (const hojas of workbook) {
      this.regitrarData(hojas);
      break
    }
    return { status: HttpStatus.OK };
  }

  private formatoFecha(serial: number): Date {
    if (serial) {
      const baseDate = new Date(1900, 0, 1);
      baseDate.setDate(baseDate.getDate() + serial - 1);
      baseDate.setMilliseconds((serial % 1) * 24 * 60 * 60 * 1000);
      baseDate.setHours(baseDate.getHours() - 4);
      return baseDate;
    }
    return null;
  }

  private async regitrarData(hojas: exceljs.stream.xlsx.WorksheetReader) {
    let contador = 0;
    for await (const filas of hojas) {
      contador++;
      console.log(contador);

      if (contador === 1) continue;
      const pedido = String(filas.getCell(1).value);
      console.log(pedido);

      const sucursal = String(filas.getCell(15).value);
      await this.guardarSucursal(sucursal);
      const venta = await this.ventaService.verificarVentaExiste(pedido)
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
        const sucursalEncontrada =
          await this.sucursalService.verificarSucursal(sucursal);
           
        if (sucursalEncontrada) {
           const ventaMia = await this.apiVentaMia(pedido)
           const combinacion = await this.registrarAtribustosLente(ventaMia);
         const ventaData: VentaI = {
            codigo: String(filas.getCell(16).value),
            descripcion: String(filas.getCell(17).value),
            pedido: pedido,
            fechaVenta: this.formatoFecha(Number(filas.getCell(2).value)),
            estado: String(filas.getCell(7).value),
            sucursal: sucursalEncontrada._id,
            ...(ventaMia && { descripcionCombinacion: ventaMia.descripcion }),
            ...(combinacion && { combinacionReceta: combinacion._id }),
            ...(ventaMia && { id_venta: ventaMia.id_venta }),
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
  private guardarSucursal(sucursal: string) {
    return this.sucursalService.crearSucursal(sucursal);
  }

  private async apiVentaMia(numeroNovar: string): Promise<VentaApiMia> {
    try {
      const url: string = `${apiMia}/api/venta/numeroNovar`;
      const token: string =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzIyYTEyMTU5ZmZmMzAzYWY3ODkxNjYiLCJ1c2VybmFtZSI6Imthbm5hMiIsImlhdCI6MTczMzE0NTM0NCwiZXhwIjoxNzMzMTYzMzQ0fQ.p1wF-qQ_xLOjQ85vMFfxXCJBYEHgOqCcjmZ3YpU5Y2g';
      const response = await firstValueFrom(
        this.httpService.post(url, {
          numeroNovar: numeroNovar,
          token: token,
        }),
      );

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async registrarAtribustosLente(data: VentaApiMia) {
    console.log(data);
    

    try {
      if (data) {
        const [
          material,
          marca,
          rango,
          tipoLente,
          tipoColorLente,
          colorLente,
          tratamiento,
        ] = await Promise.all([
          this.materialService.registarMaterialLente(
            data.material.nombre,
            data.material.abreviaturaNovar,
          ),

          this.marcaService.registarMarcaLente(
            data.marcaLente.nombre,
            data.marcaLente.abreviaturaNovar,
          ),

          this.rangoService.registarRangoLente(
            data.rango.nombre,
            data.rango.abreviaturaNovar,
          ),

          this.tipoLenteService.registarTipoLenteLente(
            data.tipoLente.nombre,
            data.tipoLente.abreviaturaNovar,
          ),

          this.tipoColorService.registarTipoColorLente(
            data.tipoColorLente.nombre,
            data.tipoColorLente.abreviaturaNovar,
          ),

          this.colorLenteService.registarColorLente(
            data.ColorLente.nombre,
            data.ColorLente.abreviaturaNovar,
          ),

          this.tratamientoService.registarTratamientoLenteLente(
            data.tratamiento.nombre,
            data.tratamiento.abreviaturaNovar,
          ),
        ]);

        const combinacion: combinacionReceta = {
          colorLente: colorLente._id,
          marcaLente: marca._id,
          material: material._id,
          rango: rango._id,
          tipoColorLente: tipoColorLente._id,
          tipoLente: tipoLente._id,
          tratamiento: tratamiento._id,
        };

        const receta =
          await this.combinacionRecetaService.registrarCombinacion(combinacion);
        return receta;
      }
    } catch (error) {
      console.log(error);
    }
  }


}
