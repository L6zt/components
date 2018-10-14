  import {isArray, isObject, hasOwnPrototype} from  './type';
  /*
  *
  *
  */
  export const deepClone = (data) => {
    // 临时状态数据
    let tempData = null;
    if (isArray(data)) {
      let lg = data.length;
       tempData = new Array();
      for ( let idx = 0; idx < lg; idx++ ) {
        let item = data[idx];
        tempData[idx] = deepClone(item)
      }
    } else if (isObject(data)) {
      let tempData = new Object();
      for (let k in data) {
        if (hasOwnPrototype(data, k)) {
          tempData[k] = deepClone(data)
        }
      }
    }else {
      tempData = data;
    }
    return tempData
  }
