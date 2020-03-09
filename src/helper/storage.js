const PREFIX = 'BANK';
export const setItem = (data, key) => {
  sessionStorage.setItem(PREFIX.concat(key), JSON.stringify(data));
};

export const getItem = key => {
  const data = JSON.parse(sessionStorage.getItem(PREFIX.concat(key)));
  return data;
};
