const getLocation = (locationStr) => (locationStr.split(',')[0]);

const formatDate = (date) => {
  const dateObj = date ? new Date(date) : new Date();
  return `${dateObj.getFullYear()}-${dateObj.getDate()}-${dateObj.getMonth() + 1}`;
};

const formatTime = (timeStr) => {
  const dateObj = timeStr ? new Date(timeStr) : new Date();
  const time = dateObj.getHours();
  return `${time > 12 ? time - 12 : (time || 12)} ${time >= 12 ? 'PM' : 'AM'}`;
};

export { getLocation, formatDate, formatTime };
