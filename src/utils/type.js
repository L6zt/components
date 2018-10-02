const toString = (v) => {
  return Object.prototype.toString.call(v);
};
export const isNumber = (num) => {
  return typeof num === 'number' && !isNaN(num)
};
export const isString = (str) => {
  return typeof  str === 'string'
};
export const isObject = (obj) => {
  return typeof  str === 'object' && toString(obj) === '[object Object]'
};
export const isArray = (items) => {
  return toString(items) === '[object Array]'
};