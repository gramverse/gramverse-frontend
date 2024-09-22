const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hourCycle: "h12",
  hour: "numeric",
  minute: "numeric",
}; //set in case

export function formatDate(input: Date | string | number): string {
  const date = input instanceof Date ? input : new Date(input);
  return date.toLocaleTimeString("fa-IR", timeFormatOptions);
}
