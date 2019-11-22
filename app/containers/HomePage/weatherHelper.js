/* eslint-disable camelcase */
import { findIndex } from 'lodash';
import { formatTime, formatDate } from '../../services/helper';

// calculating avg and converting them from string (because toFixed changing number to string) to number
const getAvgValue = (val, val1, floatingPrecision = 2) => (+((val + val1) / 2).toFixed(floatingPrecision));

const getSynthesizedWeatherList = (list) => {
  const weathers = [];

  list.forEach(({ dt_txt, dt, main: { temp, temp_min, temp_max, humidity } }) => {
    const date = formatDate(dt_txt);
    const time = formatTime(dt_txt);

    if (!date || !time) {
      return false;
    }

    const index = findIndex(weathers, (obj) => (obj.date === date));

    if (index >= 0) {
      const { avgTempMin, avgTempMax, avgHumidity, avgTemp } = weathers[index];
      weathers[index].chartData.push([time, temp]);

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
  getAvgValue
};
