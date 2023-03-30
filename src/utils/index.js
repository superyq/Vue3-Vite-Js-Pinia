// 获取当前年月日 日期
// 例：2023年3月30日 星期四
export function nowDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let week = date.getDay();
  let weekArr = [
    "星期天",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let weekMsg = weekArr[week];

  hour = hour < 10 ? `0${hour}` : hour;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${year}年${month}月${day}日 ${weekMsg}`;
}

// 深拷贝
export function deepClone(obj) {
  if (obj === null) return null;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;

  let cloneObj = new obj.constructor();
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key]);
    }
  }
  return cloneObj;
}

// *号占位符
// str: 字符串，start: 字符串开始下标，len: 占位长度，placeholder: 占位符
// placeHolder({ str: "18284583308", start: 3, len: 4 })
// 输出：182 **** 3308
export function placeHolder({ str, start, len = null, placeholder = "*" }) {
  if (!str) return str;
  if (typeof str !== "string") return str;

  let arr = str.split("");
  if (len == null) {
    len = arr.length - start;
  }

  let _placeholder = "";
  for (let i = 0; i < len; i++) {
    _placeholder += placeholder;
  }

  _placeholder = ` ${_placeholder} `;

  arr.splice(start, len, _placeholder);
  let _str = arr.join("");

  return _str;
}

// 获取浏览器参数
// name: 参数名
// 例：?age=19
// urlParameter('age') 返回 '19'
export function urlParameter(name) {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  let r = window.location.search.substring(1).match(reg);
  let context = "";
  if (r != null) {
    context = decodeURIComponent(r[2]);
  }
  reg = null;
  r = null;
  return context == null || context == "" || context == "undefined"
    ? ""
    : context;
}
