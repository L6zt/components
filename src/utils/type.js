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
  return  toString(obj) === '[object Object]'
};
export const isArray = (items) => {
  return toString(items) === '[object Array]'
};
export  const hasOwnPrototype = (obj, k) => {
  return Object.hasOwnProperty.call(obj, k)
}
