// eslint-disable-next-line
Date.prototype.format = function(format) {
  var date = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S+': this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
    }
  }
  return format;
};
let empty = (val) => {
  return val || '暂无';
};
let isEmpty = (val) => {
  if (!val) {
    return '------';
  } else {
    return val;
  }
};
let date = (val) => {
  if (!val) {
    return '';
  }
  let newDate = new Date(val);
  let d = newDate.format('yyyy-MM-dd');
  return d;
};
let time = (val) => {
  if (!val) {
    return '';
  }
  let newDate = new Date(val);
  let d = newDate.format('yyyy-MM-dd hh:mm:ss');
  return d;
};

let timeFomater = (timestamp) => {
  var date = new Date(timestamp * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = change(date.getDate()) + ' ';
  let h = change(date.getHours()) + ':';
  let m = change(date.getMinutes()) + ':';
  let s = change(date.getSeconds());
  return Y + M + D + h + m + s;
};
function change(t) {
  if (t < 10) {
    return '0' + t;
  } else {
    return t;
  }
}

export { empty, isEmpty, date, time, timeFomater };
