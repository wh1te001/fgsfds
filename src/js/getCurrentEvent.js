/**
 * Checks if the current date falls within the range of any event.
 * Helping Rika pick out an outfit for the event.
 *
 * @param {Object} events - An object containing event details.
 * @returns {{folder: string, defaultImage: string, clickedImage: string} | null} -
 * An object with paths to the event images or null if no event is found.
 */
function getCurrentEvent(events) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  for (const eventItem in events) {
    const event = events[eventItem];

    const startYear = event.start.year !== null ? event.start.year : currentYear;
    const endYear = event.end.year !== null ? event.end.year : currentYear;

    const startDate = new Date(startYear, event.start.month - 1, event.start.day);
    const endDate = new Date(endYear, event.end.month - 1, event.end.day);

    // Adjust end date for events that span over the end of the year
    if (startDate > endDate) {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Some complicated logic to accurately determine the current event. ≧ ﹏ ≦
    const isWithinDateRange = currentDate >= startDate && currentDate <= endDate;
    const isYearlyEvent = event.start.year === null && event.end.year === null;
    // prettier-ignore
    const isSpanningEvent = isYearlyEvent && (
      (event.start.month < event.end.month &&
        ((currentMonth > event.start.month && currentMonth < event.end.month) ||
         (currentMonth === event.start.month && currentDay >= event.start.day) ||
         (currentMonth === event.end.month && currentDay <= event.end.day))) ||
      (event.start.month > event.end.month &&
        ((currentMonth > event.start.month || currentMonth < event.end.month) ||
         (currentMonth === event.start.month && currentDay >= event.start.day) ||
         (currentMonth === event.end.month && currentDay <= event.end.day)))
      );

    if (isWithinDateRange || isSpanningEvent) {
      return {
        name: event.name
      };
    }
  }
  return null;
}

// Allows you to make functions global. This is necessary for tests to work.
window.getCurrentEvent = getCurrentEvent;
