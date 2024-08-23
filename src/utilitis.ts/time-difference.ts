export const getTimeDifference = (now: Date, date: Date) => {
  const yearDiff = now.getFullYear() - date.getFullYear();
  const monthDiff = now.getMonth() - date.getMonth();
  const dayDiff = now.getDate() - date.getDate();

  let years = yearDiff;
  let months = monthDiff;
  let days = dayDiff;

  // Adjust for negative month or day differences
  if (dayDiff < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years--;
    months += 12;
  }

  // Calculate weeks
  const totalDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  const weeks = Math.floor(totalDays / 7);
  days = totalDays % 7;

  const difference: Record<string, [number, string]> = {
    years: [years, "سال پیش"],
    months: [months, "ماه پیش"],
    weeks: [weeks, "هفته پیش"],
    days: [days, "روز پیش"],
  };
  return Object.entries(difference)
    .filter(([_, value]) => value[0] > 0)
    .map(([_, value]) => value)
    .reduce((prev, cur) => prev.concat(`${cur[0]} `).concat(`${cur[1]} `), "")
    .concat(!(years | months | weeks | days) ? "دقایقی پیش" : "");
};
