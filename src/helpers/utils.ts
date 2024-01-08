export const formatDate = (date: string) => {
    // console.log(date);
    const dateParts = date.split('T')[0].split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Restamos 1 al mes porque es 0-indexado
    const day = parseInt(dateParts[2], 10);
  
    const newDate = new Date(year, month, day);
  
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
  
    return newDate.toLocaleDateString('es-ES', options as Intl.DateTimeFormatOptions);
};

export const formatDateWithHours = (date: string) => {
  const inputDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    /* weekday: "short", */
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour clock format with AM/PM
  };

  const formattedDate = inputDate.toLocaleDateString("es-ES", options);
  return formattedDate;
};