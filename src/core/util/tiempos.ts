import * as moment from 'moment';

export function diferencia(fechaInicio: Date, fechaFin: Date) {
  const f1 = moment(fechaInicio);
  const f2 = moment(fechaFin);

  const minutos = f2.diff(f1, 'minutes');

  const totalHoras = Math.floor(minutos / 60);

  const minutosRestantes = minutos % 60;

  const dias = Math.floor(totalHoras / 24);

  const horasRestantes = totalHoras % 24;

  return {
    totalHoras,
    minutosRestantes,
    dias,
    horasRestantes,
  };
}

export function convertirHorasADiasYMinutos(horas: number) {
  const minutos = horas * 60;
  const totalHoras = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;
  const dias = Math.floor(totalHoras / 24);
  const horasRestantes = totalHoras % 24;

  return{
    totalHoras, minutosRestantes, dias, horasRestantes
  }
}
