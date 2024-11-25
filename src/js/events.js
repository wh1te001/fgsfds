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
 * @property {string} name - Event name.
 * @property {DateObject} start - Start date of the event.
 * @property {DateObject} end - End date of the event.
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
    end: { month: 1, day: 1, year: null }
  },
  watanagashi: {
    name: 'watanagashi',
    start: { month: 6, day: 19, year: null },
    end: { month: 6, day: 19, year: null }
  }
};
