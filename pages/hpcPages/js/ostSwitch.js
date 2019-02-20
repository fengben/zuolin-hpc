const OST_NAME = "ostName";
const OST_IP = "ostIp";
let driveLetter = [];
let backupOstAddress = [];
$(function() {
  let ostName = getQueryString(OST_NAME);
  let ostIp = getQueryString(OST_IP);
  console.log("ostName="+ostName);
  console.log("ostIp="+ostIp);
  $("#ost-switch tr:eq(1) td:eq(0)").text(ostName);
  $("#ost-switch tr:eq(1) td:eq(2)").text(ostIp);
  getFromWS("/examples/api/getDriveLetterDataByIp.template","ip="+ostIp,driveLetter,getAndDealWithDriveLetter);

  $("#probe").click(function() {
    alert("点击事件响应");
    let driveSelected = $("#drive-show option:selected").val();
    console.log("ip:"+ostIp+"drive:"+driveSelected);
    getFromWS("/examples/api/probeBackupOst.template","ip="+ostIp+"$^@^$"+"drive="+driveSelected,backupOstAddress,getAndBackupOstAddress);
  });
});

function getAndDealWithDriveLetter(){
  console.log("得到的磁盘数据"+driveLetter[0]);
  driveLetter[0].match(/sd[b-z]/g).forEach(function(val) {
    console.log("盘符="+val);
    $("#drive-show").append(`<option value="${val}">${val}</option>`);
  });
  $("#probe").attr('disabled',false);
}

function getAndBackupOstAddress(){
  console.log(backupOstAddress[0]);
}

//通过参数名获得get传递的值
function getQueryString(name) {
  let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if(r!=null)return  decodeURI(r[2]); return null;
}

function test() {
  alert("点击事件响应");
}