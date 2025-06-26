export interface dataExcelI {
  pedido: string;
  fechaVenta: Date;
  fechaFinalizacion: Date;
  fechaEntrega: Date;
  estado: string;
  sucursal: string;
  codigo: string;
  descripcion: string;
}

export interface VentaApiMia {
  fechaVenta: string;
  id_venta: string;
  fecha_finalizacion: string;
  numeroNovar: string;
  fecha_prevista_entrega: string;
  material: Atributo;
  marcaLente: Atributo;
  ColorLente: Atributo;
  rango: Atributo;
  tipoColorLente: Atributo;
  tipoLente: Atributo;
  tratamiento: Atributo;
  lente1: lente;
  lente2: lente;
  descripcion: string;
}

interface lente {
  codigo:string
  tipo: string;

  antireflejo: string;

  grupoProducto: string;
}

interface Atributo {
  nombre: string;
  abreviaturaNovar: string;
}
