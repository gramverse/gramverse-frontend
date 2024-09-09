export const getTimeDifference = (now: Date, date: Date) => {
  const yearDiff = now.getFullYear() - date.getFullYear();
  const monthDiff = now.getMonth() - date.getMonth();
  const dayDiff = now.getDate() - date.getDate();
  const hourDiff = now.getHours() - date.getHours();
  const minuteDiff = now.getMinutes() - date.getMinutes();

  let years = yearDiff;
  let months = monthDiff;
  let days = dayDiff;
  let hours = hourDiff;
  let minutes = minuteDiff;

  if (minuteDiff < 0) {
    hours--;
    minutes += 60;
  }
  if (hourDiff < 0) {
    days--;
    hours += 24;
  }
  if (dayDiff < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (monthDiff < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  const weeks = Math.floor(totalDays / 7);
  days = totalDays % 7;

  const difference: Record<string, [number, string]> = {
    years: [years, "سال"],
    months: [months, "ماه"],
    weeks: [weeks, "هفته"],
    days: [days, "روز"],
    hours: [hours, "ساعت"],
    minutes: [minutes, "دقیقه"],
  };

  if (years > 0) {
    return Object.entries(difference)
      .slice(0, 2)
      .filter(([, value]) => value[0] > 0)
      .map(([, value]) => value)
      .reduce(
        (prev, cur) =>
          prev.concat(`${cur[0]} `).concat(`${cur[1]} `).concat(" و "),
        "",
      )
      .slice(0, -3)
      .concat(" پیش");
  } else {
    if (months > 0) {
      return Object.entries(difference)
        .slice(0, 3)
        .filter(([, value]) => value[0] > 0)
        .map(([, value]) => value)
        .reduce(
          (prev, cur) =>
            prev.concat(`${cur[0]} `).concat(`${cur[1]} `).concat(" و "),

          "",
        )
        .slice(0, -3)
        .concat(" پیش");
    } else {
      if (weeks > 0) {
        return Object.entries(difference)
          .slice(0, 4)
          .filter(([, value]) => value[0] > 0)
          .map(([, value]) => value)
          .reduce(
            (prev, cur) =>
              prev.concat(`${cur[0]} `).concat(`${cur[1]} `).concat(" و "),

            "",
          )
          .slice(0, -3)
          .concat(" پیش");
      } else {
        if (days > 0) {
          return Object.entries(difference)
            .slice(0, 5)
            .filter(([, value]) => value[0] > 0)
            .map(([, value]) => value)
            .reduce(
              (prev, cur) =>
                prev.concat(`${cur[0]} `).concat(`${cur[1]} `).concat(" و "),

              "",
            )
            .slice(0, -3)
            .concat(" پیش");
        } else {
          if (hours > 0) {
            return Object.entries(difference)
              .slice(0, 6)
              .filter(([, value]) => value[0] > 0)
              .map(([, value]) => value)
              .reduce(
                (prev, cur) =>
                  prev.concat(`${cur[0]} `).concat(`${cur[1]} `).concat(" و "),

                "",
              )
              .slice(0, -3)
              .concat(" پیش");
          } else {
            if (minutes > 0) {
              return Object.entries(difference)
                .slice(0, 7)
                .filter(([, value]) => value[0] > 0)
                .map(([, value]) => value)
                .reduce(
                  (prev, cur) =>
                    prev
                      .concat(`${cur[0]} `)
                      .concat(`${cur[1]} `)
                      .concat(" و "),

                  "",
                )
                .slice(0, -3)
                .concat(" پیش");
            } else {
              if (
                years === 0 &&
                months === 0 &&
                weeks === 0 &&
                days === 0 &&
                hours === 0 &&
                minutes === 0
              )
                return "همین الان";
            }
          }
        }
      }
    }
  }
};
