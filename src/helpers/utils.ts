export const formatDate = (date: string) => {
    // console.log(date);
    const dateParts = date.split('T')[0].split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Restamos 1 al mes porque es 0-indexado
    const day = parseInt(dateParts[2], 10);
  
    const newDate = new Date(year, month, day);
  
    const options = {
      // weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
  
    return newDate.toLocaleDateString('es-ES', options as Intl.DateTimeFormatOptions);
};