export const createFormattedDate = (dateToFormat) => {
  try {
    let date;
    if (dateToFormat) date = new Date(dateToFormat);
    else date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error(error);
    throw 'Failed to create date. Please check the console for more information.';
  }
};

export const compareDatesForNotifications = (before) => {
  try {
    if (!before) return;
    const nowDate = new Date();
    const beforeDate = new Date(before);

    const yearDiff = nowDate.getFullYear() - beforeDate.getFullYear();
    const monthDiff = nowDate.getMonth() - beforeDate.getMonth();
    const dayDiff = nowDate.getDate() - beforeDate.getDate();
    const hourDiff = nowDate.getHours() - beforeDate.getHours();
    const minuteDiff = nowDate.getMinutes() - beforeDate.getMinutes();

    if (nowDate < beforeDate) throw 'Now date cannot be less than before date';
    if (nowDate === beforeDate) return 'Just now';
    if (yearDiff > 0) return `${yearDiff} ${yearDiff === 1 ? 'year' : 'years'} ago`;
    if (monthDiff > 0) return `${monthDiff} ${monthDiff === 1 ? 'month' : 'months'} ago`;
    if (dayDiff > 0) return `${dayDiff} ${dayDiff === 1 ? 'day' : 'days'} ago`;
    if (hourDiff > 0) return `${hourDiff} ${hourDiff === 1 ? 'hour' : 'hours'} ago`;
    if (minuteDiff > 0) return `${minuteDiff} ${minuteDiff === 1 ? 'minute' : 'minutes'} ago`;
    return '';
  } catch (error) {
    console.error(error);
    throw 'Failed to compare dates. Please check the console for more information.';
  }
};
