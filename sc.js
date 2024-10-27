/**
 * @typedef {Object} DateObject - Object for specifying the event date.
 * @property {number} month - Month number (from 0 to 11).
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

/**
 * The object contains the events during which the sprite should be changed.
 * You can add your own events to this object.
 *
 * @type {Object.<string, EventObject>}
 */
const events = {
  halloween: {
    start: { month: 9, day: 1 },
    end: { month: 9, day: 31 },
    folder: 'halloween',
    defaultImage: 'Rika_Default.webp',
    clickedImage: 'Rika_Happy.webp'
  }
};

const defaultFolder = 'default';
const defaultImage = 'RikaOG_(1).webp';
const defaultClickedImage = 'RikaOG_(4).webp';

const image = document.getElementById('clickableImage');
const sound = document.getElementById('sound');

/**
 * Checks if the current date falls within the range of any event.
 *
 * @returns {{folder: string, defaultImage: string, clickedImage: string} | null} -
 * An object with paths to the event images or null if no event is found.
 */
function getCurrentEvent() {
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();

  for (const event in events) {
    const { start, end, folder, defaultImage, clickedImage } = events[event];

    // Case for single-day event
    if (start.month === end.month && start.day === end.day) {
      if (month === start.month && day === start.day) {
        return { folder, defaultImage, clickedImage };
      }
    }

    // Case for events crossing year boundary
    if (
      month > start.month ||
      (month === start.month && day >= start.day) ||
      (start.month > end.month &&
        (month < end.month || (month === end.month && day <= end.day))) ||
      month < end.month ||
      (month === end.month && day <= end.day)
    ) {
      return { folder, defaultImage, clickedImage };
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

const currentEvent = getCurrentEvent();
const folder = currentEvent ? currentEvent.folder : defaultFolder;

const defaultSrc = generateImagePath(
  folder,
  currentEvent ? currentEvent.defaultImage : defaultImage
);
const clickedSrc = generateImagePath(
  folder,
  currentEvent ? currentEvent.clickedImage : defaultImage
);

image.src = defaultSrc;

image.addEventListener('click', () => {
  sound.play();
  image.src = clickedSrc;

  sound.onended = () => {
    image.src = defaultSrc;
  };
});
