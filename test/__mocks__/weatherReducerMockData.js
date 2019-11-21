const initialState = {
  weathers: [
    {
      date: '2019-21-11',
      id: 1574316000,
      avgTemp: 2.23,
      avgHumidity: 93,
      avgTempMin: 0.08,
      avgTempMax: 1.75,
      chartData: [
        [
          '6 AM',
          1.75
        ]
      ],
      tempMin: 0.53,
      tempMax: 1.36,
      humidity: 93
    }
  ],
  error: '',
  loading: false
};

const weatherReducer = (state = initialState, action = '') => {
  const { type } = action;
  switch (type) {
    case 'SAMPLE':
      return state;

    default:
      return state;
  }
};

export default weatherReducer;
