function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function checkMobile(value){
    var reg =/^\d{11}$/g
    if(!reg.test(value)){
        return false;
    }
    return true
}

function checkAuthCode(value){
  var reg =/^\d{4}$/g
    if(!reg.test(value)){
        return false;
    }
    return true
}

function log(name,value){
    console.log('*'.repeat(30));
    if(value==null||value=='undefined'){
        console.log(name)
    }else{
        console.log(' -'+name+": ",value)
    }
    console.log('*'.repeat(30));
}

const _IP = 'https://fenqi.baoxianshenqi.cn'
const _SECRET = 'b2c82514d30a19451f1214a26fa4f519'
const _APPID = 'wxdceaa6932555fd92'


module.exports = {
  formatTime: formatTime,
  checkMobile:checkMobile,
  IP:_IP,
  SECRET:_SECRET,
  APPID:_APPID,
  checkAuthCode:checkAuthCode,
  log:log
}
