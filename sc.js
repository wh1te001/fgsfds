// =======================
// JSDoc Types
// =======================
/**
 * @typedef {Object} DateObject - Object for specifying the event date.
 * @property {number} month - Month number.
 * @property {number} day - Day of the month.
 */

/**
 * @typedef {Object} EventObject - Object containing event data.
 * @property {DateObject} start - Start date of the event.
 * @property {DateObject} end - End date of the event.
 * @property {string} folder - Folder containing sprites for the event.
 * @property {string} defaultImage - Default sprite name.
 * @property {string} clickedImage - Sprite name for when clicked.
 */
// =======================
// End of JSDoc Types
// =======================

/**
 * The object contains days on which Rika can change her clothes.
 * You can add your own events to this object.
 *
 * @type {Object.<string, EventObject>}
 */
const events = {
  halloween: {
    start: { month: 10, day: 1, year: null },
    end: { month: 10, day: 31, year: null },
    folder: 'halloween',
    defaultImage: 'Rika_Default.webp',
    clickedImage: 'Rika_Happy.webp'
  },
  newyear: {
    start: { month: 11, day: 1, year: null },
    end: { month: 12, day: 31, year: null },
    folder: 'newyear',
    defaultImage: 'Rika__Default_NY.png',
    clickedImage: 'Rika__Happy_NY.png'
  }
};

const defaultFolder = 'default';
const defaultImage = 'RikaOG_(1).webp';
const defaultClickedImage = 'RikaOG_(4).webp';

const defaultImageHanyuu = 'HanyuuOG_(1).webp';
const defaultClickedImageHanyuu = 'HanyuuOG_(6).webp';

const image = document.getElementById('clickableImage');
const sound = document.getElementById('sound');

const imageHanyuu = document.getElementById('hanyuuClick');
const soundHanyuu = document.getElementById('nanodesu');

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
        folder: event.folder,
        defaultImage: event.defaultImage,
        clickedImage: event.clickedImage
      };
    }
  }
  return null;
}

/**
 * Generates the path for a sprite image based on folder and image name.
 *
 * @param {string} folder - Folder where the sprite is located.
 * @param {string} imageName - Image file name.
 * @returns {string} - Full path to the sprite image.
 */
function generateImagePath(folder, imageName) {
  return `src/sprites/${folder}/${imageName}`;
}

/**
 * Initializes Rika and now she can begin her meaningless existence.
 */
function initRika() {
  const currentEvent = getCurrentEvent(events);
  const folder = currentEvent ? currentEvent.folder : defaultFolder;

  const defaultSrc = generateImagePath(folder, currentEvent ? currentEvent.defaultImage : defaultImage);
  const clickedSrc = generateImagePath(folder, currentEvent ? currentEvent.clickedImage : defaultClickedImage);

  if (image && sound) {
    image.src = defaultSrc;
    image.addEventListener('click', () => {
      sound.play();
      image.src = clickedSrc;

      sound.onended = () => {
        image.src = defaultSrc;
      };
    });
  }
}
function initHanyuu() {
  const currentEvent = getCurrentEvent(events);
  const folder = currentEvent ? currentEvent.folder : defaultFolder;

  const defaultHanyuuSrc = generateImagePath(folder, currentEvent ? currentEvent.defaultImage : defaultImageHanyuu);
  const clickedHanyuuSrc = generateImagePath(folder, currentEvent ? currentEvent.clickedImage : defaultClickedImageHanyuu);

  if (imageHanyuu && soundHanyuu) {
    imageHanyuu.src = defaultHanyuuSrc;
    imageHanyuu.addEventListener('click', () => {
      soundHanyuu.play();
      imageHanyuu.src = clickedHanyuuSrc;

      soundHanyuu.onended = () => {
        imageHanyuu.src = defaultHanyuuSrc;
      };
    });
  }
}

initRika();
initHanyuu();

// Allows you to make functions global. This is necessary for tests to work.
window.getCurrentEvent = getCurrentEvent;
