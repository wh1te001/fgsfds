require('../sc.js');

const events = {
  halloween: {
    start: { month: 10, day: 1, year: null },
    end: { month: 10, day: 31, year: null },
    folder: 'halloween',
    defaultImage: 'Rika_Default.webp',
    clickedImage: 'Rika_Happy.webp'
  },
  newyear: {
    start: { month: 12, day: 31, year: null },
    end: { month: 1, day: 1, year: null },
    folder: 'newyear',
    defaultImage: 'Rika_NewYear_Default.webp',
    clickedImage: 'Rika_NewYear_Happy.webp'
  },
  watanagashi: {
    start: { month: 6, day: 19, year: 2024 },
    end: { month: 6, day: 19, year: 2024 },
    folder: 'watanagashi',
    defaultImage: 'Rika_Watanagashi_Default.webp',
    clickedImage: 'Rika_Watanagashi_Happy.webp'
  },
  testday: {
    start: { month: 8, day: 15, year: null },
    end: { month: 8, day: 19, year: null },
    folder: 'testFolder',
    defaultImage: 'test.webp',
    clickedImage: 'test.webp'
  }
};

describe('getCurrentEvent()', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Rika should be celebrating Halloween', () => {
    jest.setSystemTime(new Date(2024, 9, 15));

    const result = window.getCurrentEvent(events);
    expect(result).toEqual({
      folder: 'halloween',
      defaultImage: 'Rika_Default.webp',
      clickedImage: 'Rika_Happy.webp'
    });
  });

  test('Rica shouldn`t celebrate Halloween because it`s over', () => {
    jest.setSystemTime(new Date(2024, 10, 15));

    const result = window.getCurrentEvent(events);
    expect(result).toBeNull();
  });

  test('Rika should be celebrating New Year', () => {
    jest.setSystemTime(new Date(2023, 11, 31));

    const result = getCurrentEvent(events);
    expect(result).toEqual({
      folder: 'newyear',
      defaultImage: 'Rika_NewYear_Default.webp',
      clickedImage: 'Rika_NewYear_Happy.webp'
    });
  });

  test('Rika shouldn`t celebrate New Year because it`s over', () => {
    jest.setSystemTime(new Date(2023, 0, 2));

    const result = getCurrentEvent(events);
    expect(result).toBeNull();
  });

  test('Rika should be celebrating Watanagashi', () => {
    jest.setSystemTime(new Date(2024, 5, 19));

    const result = getCurrentEvent(events);
    expect(result).toEqual({
      folder: 'watanagashi',
      defaultImage: 'Rika_Watanagashi_Default.webp',
      clickedImage: 'Rika_Watanagashi_Happy.webp'
    });
  });

  test('Rika shouldn`t celebrating Watanagashi because it`s over', () => {
    jest.setSystemTime(new Date(2024, 5, 20));

    const result = getCurrentEvent(events);
    expect(result).toBeNull();
  });

  test('Checking an event that repeats itself every year. Test 2000 year', () => {
    jest.setSystemTime(new Date(2000, 7, 15));

    const result = getCurrentEvent(events);
    expect(result).toEqual({
      folder: 'testFolder',
      defaultImage: 'test.webp',
      clickedImage: 'test.webp'
    });
  });

  test('Checking an event that repeats itself every year. Test 2001 year', () => {
    jest.setSystemTime(new Date(2001, 7, 15));

    const result = getCurrentEvent(events);
    expect(result).toEqual({
      folder: 'testFolder',
      defaultImage: 'test.webp',
      clickedImage: 'test.webp'
    });
  });
});
