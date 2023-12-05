const getDateNowFormat = (): string => {
    const fechaActual: Date = new Date();
    const anio: number = fechaActual.getFullYear();
    const mes: string = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia: string = String(fechaActual.getDate()).padStart(2, '0');
    const horas: string = String(fechaActual.getHours()).padStart(2, '0');
    const minutos: string = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundos: string = String(fechaActual.getSeconds()).padStart(2, '0');
    const milisegundos: string = String(fechaActual.getMilliseconds()).padStart(3, '0');
    const fechaFormateada: string = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}.${milisegundos}`;
    return fechaFormateada;
  }; 
//   const fechaFormateada: string = getDateNowFormat();
  export { getDateNowFormat }

  