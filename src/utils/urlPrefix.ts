export const BASE_URL =
  process.env.REACT_APP_MOCK === 'true'
    ? 'http://api.downtown8.com/mock/12'
    : 'http://api.downtown8.com/mock/15';

console.log(process.env.REACT_APP_MOCK);
