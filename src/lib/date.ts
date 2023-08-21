interface Date {
  format: (f: string) => string;
}

Date.prototype.format = function (f) {
  if (!this.valueOf()) return ' ';

  let weekName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  let d = this;
  let h;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case 'yyyy':
        return d.getFullYear().toString();
      case 'yy':
        return (d.getFullYear() % 1000).toString();
      case 'MM':
        return ('0' + (d.getMonth() + 1)).slice(-2).toString();
      case 'dd':
        return d.getDate().toString().padStart(2, '0');
      case 'E':
        return weekName[d.getDay()];
      case 'HH':
        return ('0' + d.getHours()).slice(-2).toString();
      case 'hh':
        return ((h = d.getHours() % 12) ? h : 12).toString();
      case 'mm':
        return ('0' + d.getMinutes()).slice(-2);
      case 'ss':
        return d.getSeconds().toString();
      case 'a/p':
        return d.getHours() < 12 ? '오전' : '오후';
      default:
        return $1;
    }
  });
};
