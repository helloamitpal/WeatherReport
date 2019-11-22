import { getLocation, formatDate, formatTime } from '../../../app/services/helper';

describe('Testing Helper service ', () => {
  it('getLocation should return city name', () => {
    const city = getLocation('Bangalore, EN');
    expect(city).toEqual('Bangalore');
  });

  it('formatDate should return formated date', () => {
    expect(formatDate('2019-10-10')).toEqual('2019-10-10');
  });

  it('formatTime should return formated time', () => {
    expect(formatTime('2019-10-10 8:00:00')).toEqual('8 AM');
  });
});
