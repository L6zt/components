  import {isArray, isObject, hasOwnPrototype, isNumber, isString} from  './type';
  /*
  *
  *
  */
  //  递归复制 对象
  export const deepClone = (data) => {
    // 临时状态数据
    let tempData = null;
    console.log(data);
    if (isArray(data)) {
      let lg = data.length;
       tempData = new Array();
      for ( let idx = 0; idx < lg; idx++ ) {
        let item = data[idx];
        tempData[idx] = deepClone(item)
      }
    } else if (isObject(data)) {
      tempData = new Object();
      for (let k in data) {
        if (hasOwnPrototype(data, k)) {
          let item = data[k];
          tempData[k] = deepClone(item)
        }
      }
    }else {
      tempData = data;
    }
    return tempData
  };
  
