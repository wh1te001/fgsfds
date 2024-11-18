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
    name: 'halloween',
    start: { month: 10, day: 1, year: null },
    end: { month: 10, day: 31, year: null }
  },
  newyear: {
    name: 'newyear',
    start: { month: 11, day: 1, year: null },
    end: { month: 12, day: 31, year: null }
  }
};
