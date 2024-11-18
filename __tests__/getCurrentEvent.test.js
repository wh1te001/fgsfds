require('../src/js/getCurrentEvent.js');

const events = {
  halloween: {
    name: 'halloween',
    start: { month: 10, day: 1, year: null },
    end: { month: 10, day: 31, year: null }
  },
  newyear: {
    name: 'newyear',
    start: { month: 12, day: 31, year: null },
    end: { month: 1, day: 1, year: null }
  },
  watanagashi: {
    name: 'watanagashi',
    start: { month: 6, day: 19, year: 2024 },
    end: { month: 6, day: 19, year: 2024 }
  },
  testday: {
    name: 'testFolder',
    start: { month: 8, day: 15, year: null },
    end: { month: 8, day: 19, year: null }
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
      name: 'halloween'
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
      name: 'newyear'
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
      name: 'watanagashi'
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
      name: 'testFolder'
    });
  });

  test('Checking an event that repeats itself every year. Test 2001 year', () => {
    jest.setSystemTime(new Date(2001, 7, 15));

    const result = getCurrentEvent(events);
    expect(result).toEqual({
      name: 'testFolder'
    });
  });
});
