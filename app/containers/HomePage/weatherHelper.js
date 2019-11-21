/* eslint-disable camelcase */
import { findIndex } from 'lodash';

const parseDateTime = (dateTimeStr) => {
  if (!dateTimeStr) {
    return {};
  }

  const dateObj = new Date(dateTimeStr);
  const dateStr = `${dateObj.getFullYear()}-${dateObj.getDate()}-${dateObj.getMonth() + 1}`;
  const time = dateObj.getHours();
  const timeStr = `${time > 12 ? time - 12 : (time || 12)} ${time >= 12 ? 'PM' : 'AM'}`;

  return {
    date: dateStr,
    time: timeStr
  };
};

const getAvgValue = (val, val1, floatingPrecision = 2) => (+((val + val1) / 2).toFixed(floatingPrecision));

const getSynthesizedWeatherList = (list) => {
  const weathers = [];

  list.forEach(({ dt_txt, dt, main: { temp, temp_min, temp_max, humidity } }) => {
    const { date, time } = parseDateTime(dt_txt);

    if (!date || !time) {
      return false;
    }

    const index = findIndex(weathers, (obj) => (obj.date === date));

    if (index >= 0) {
      const { avgTempMin, avgTempMax, avgHumidity, avgTemp } = weathers[index];
      weathers[index].chartData.push([time, temp]);

      // calculating avg and converting them from string (because toFixed changing number to string) to number
      weathers[index].tempMin = getAvgValue(temp_min, avgTempMin);
      weathers[index].avgTemp = getAvgValue(temp, avgTemp);
      weathers[index].tempMax = getAvgValue(temp_max, avgTempMax);
      weathers[index].humidity = getAvgValue(humidity, avgHumidity);
    } else {
      weathers.push({
        date,
        id: dt,
        avgTemp: temp,
        avgHumidity: humidity,
        avgTempMin: temp_min,
        avgTempMax: temp_max,
        chartData: [[time, temp]]
      });
    }
  });

  return weathers;
};

export {
  getSynthesizedWeatherList,
  parseDateTime,
  getAvgValue
};
