
function FormatDate(isoDate: string): string {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formattedDate = formatter.format(date);
    return formattedDate.replace(/ /g, ' ');
  }

export default FormatDate;