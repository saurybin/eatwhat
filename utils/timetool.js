const timetool = (date,type) => {
  const cn = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const en = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];   
  const enWeek = en[date.getDay()];  
  const cnWeek = cn[date.getDay()];  
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  if(type == 'week'){
    return formatNumber(month) + '.' + formatNumber(day) + ' ' + cnWeek ;
  }else if(type == 'normal'){
    return formatNumber(year) + '-' + formatNumber(month) + '-' + formatNumber(day);
  }else{
    return formatNumber(year) + '-' + formatNumber(month) + '-' + formatNumber(day) + ' ' + formatNumber(h) + ':' + formatNumber(m);
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  timetool: timetool
}
