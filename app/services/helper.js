const getLocation = (locationStr) => (locationStr.split(',')[0]);
const getTodaysDate = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getDate()}-${today.getMonth() + 1}`;
};

export { getLocation, getTodaysDate };
