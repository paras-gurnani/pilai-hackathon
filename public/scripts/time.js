function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }
var dn=new Date().getTime();
console.log(dn);
var dl=new Date();
dl.setTime(1580743800);
var diff=dn-dl;
var seconds_left = diff/ 1000;

 var days = pad(parseInt(seconds_left / 86400));
seconds_left = seconds_left % 86400;
 var hours = pad(parseInt(seconds_left / 3600));
seconds_left = seconds_left % 3600;

var minutes = pad(parseInt(seconds_left / 60));
var seconds = pad(parseInt(seconds_left % 60));
console.log(hours+":"+minutes+":"+seconds);

