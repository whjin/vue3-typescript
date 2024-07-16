import { padStart } from 'lodash';

export const fillDigit = (digit: number, len: number) => {
  return padStart('' + digit, len, '0');
};

export const isPC = () => {
  return !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|Mobile|BlackBerry|Symbian|Windows Phone)/i);
};