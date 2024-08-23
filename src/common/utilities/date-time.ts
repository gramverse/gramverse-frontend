export function getDaysAgo(inputDate: Date | string) {
  const creationDate = new Date(inputDate);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - creationDate.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  return diffInDays;
}

export function getWeeksAgo(inputDate: Date | string) {
  const creationDate = new Date(inputDate);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - creationDate.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  return diffInWeeks;
}

export function getMonthsAgo(inputDate: Date | string) {
  const creationDate = new Date(inputDate);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - creationDate.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30.44);
  return diffInMonths;
}

export function getPersianDatePast(inputDate: Date | string) {
  let persianResult = {
    dateNumber: "",
    agoScale: "دقایقی پیش",
  };
  const dateAgo = getDaysAgo(inputDate);
  const lessThanweek = dateAgo > 0 && dateAgo < 7;
  const moreThanweek = dateAgo > 7 && dateAgo < 28;
  const moreThanMonth = dateAgo > 28;

  if (lessThanweek) {
    persianResult.agoScale = "روز پیش";
    persianResult.dateNumber = dateAgo.toString();
  } else if (moreThanweek) {
    const weeksAgo = getWeeksAgo(inputDate);
    persianResult.agoScale = "هفته پیش";
    persianResult.dateNumber = weeksAgo.toString();
  } else if (moreThanMonth) {
    const monthAgo = getMonthsAgo(inputDate);
    persianResult.agoScale = "ماه پیش";
    persianResult.dateNumber = monthAgo.toString();
  }
  return persianResult;
}
