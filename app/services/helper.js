const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}-${date.getDay()}-${date.getFullYear()}`;
};

export { formatDate };
