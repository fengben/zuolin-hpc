var MDT_NAME_PREFIX = "whufs-MDT";
var OST_NAME_PREFIX = "whufs-OST";
var ACTIVE_SIGNAL = "active";

var ostDiskItems = new Array();
var mdtDiskItems = new Array();
var diskFirstPartInfo = new Array();
var temp = new Array();
var isHealthyResult = "";
var ostIps = new Array();
var isActiveSignal = true;
var diskStorageInfo = new Array();

$(function() {
  getFromWS("/examples/api/getDiskDatas.template","",diskFirstPartInfo,getDiskNameAndIp);
});

function getDiskNameAndIp() {

  console.log("diskFirstPartInfo[0]="+diskFirstPartInfo[0]);
  //获取mdt和ost的磁盘名称和活跃状态
  diskFirstPartInfo[0].split("\n").forEach(function(val,index) {
    var mdtDiskItem = {},ostDiskItem = {};
    var mdtDiskName = getAimStrByRegExp(val,MDT_NAME_PREFIX+"(.{1,6}-)","g");
    var ostDiskName = getAimStrByRegExp(val,OST_NAME_PREFIX+"(.{1,6}-)","g");
    if(mdtDiskName!=null){
      mdtDiskItem.mdtName = mdtDiskName[0].substring(0,mdtDiskName[0].length - 1);
      mdtDiskItem.isActive = val.match(ACTIVE_SIGNAL)==null?0:1;
      if(mdtDiskItem.isActive == 0){
        isActiveSignal = false;
      }
      mdtDiskItems.push(mdtDiskItem);
    }else if(ostDiskName!=null){
      ostDiskItem.ostName = ostDiskName[0].substring(0,ostDiskName[0].length - 1);
      ostDiskItem.isActive = val.match(ACTIVE_SIGNAL)==null?0:1;
      if(ostDiskItem.isActive == 0){
        isActiveSignal = false;
      }
      ostDiskItems.push(ostDiskItem);
    }
  });

  //获取ost磁盘对应的ip地址
  diskFirstPartInfo[1].match(/=(.{1,20})p/g).forEach(function(val,index) {
    ostDiskItems[index].ostIp = val.substring(1);
    sessionStorage.setItem(ostDiskItems[index].ostName,ostDiskItems[index].ostIp.substring(0,ostDiskItems[index].length - 4));
    console.log("磁盘信息="+ostDiskItems[index].ostIp+"index="+index);
  });

  //获取磁盘存储、使用情况
  if(isActiveSignal){
    getFromWS("/examples/api/getStorageData.template","",diskStorageInfo,getDiskStorageInfo);
  }

  //存储互不相同的ip地址
  ostDiskItems.forEach(function(val, index) {
    if($.inArray(val.ostIp,ostIps)== -1){
      ostIps.push(val.ostIp);
    }
  });

  //获取每个ost的健康状况和cpu等的动态信息
  ostIps.forEach(function(val,index) {
    //获取健康状况
    var ostIp = val.substring(0,val.length-4);
    getFromWS("/examples/api/getDiskDataByIp.template","ip="+ostIp+"$^@^$index="+index,temp,addPartDiskInfo);

    //使用websocket获取内存、cpu等的使用情况
    remoteService("serverOrder.spe",function(obj){
      initialize_websocket(obj[0],ostIp);
    });
  });
}

function addPartDiskInfo() {
  console.log("index="+temp[0]);
  console.log("健康状况="+temp[1]);
  isHealthyResult = isHealthyResult + temp[1];
  if(temp[0]==ostIps.length - 1){
    console.log("before + dealWithIsHealthy运行");
    dealWithIsHealthy();
  }
}

function dealWithIsHealthy() {
  console.log("dealWithIsHealthy运行");
  ostDiskItems.forEach(function(val, index) {

    var dealWithOstName = val.ostName.replace(/\s/g,"");
    var reg = new RegExp(dealWithOstName+"(.{1,40})@","g");
    var isHealthyStr = isHealthyResult.match(reg)[0];
    console.log("isHealthyStr="+isHealthyStr);
    val.isHealthy = isHealthyStr.substring(isHealthyStr.length - 2,isHealthyStr.length - 1);

    var classChoose = val.isHealthy==0?"status-dot-health":"ost-status-dot-bad";
    var ostWorkState = val.isActive==0?"status-gray":"status-dot-health";
    $("#ostShow").append("<tr>\n" +
        "<td>"+val.ostName +"</td>\n" +
        "<td>"+val.ostIp +"</td>\n" +
        "<td>"+val.used +"</td>\n" +
        "<td>"+val.total +"</td>\n" +
        "<td name='"+val.ostIp+"-read'>未获取</td>\n" +
        "<td name='"+val.ostIp+"-write'>未获取</td>\n" +
        "<td name='"+val.ostIp+"-cpu'>未获取</td>\n" +
        "<td name='"+val.ostIp+"-memory'>未获取</td>\n" +
        "<td name='"+val.ostIp+"-recv'>未获取</td>\n"+
        "<td name='"+val.ostIp+"-send'>未获取</td>\n"+
        "<td><div class=\"ost-status-dot "+classChoose+"\"></div></td>\n" +
        "<td><div class=\"dmt-status-dot "+ostWorkState+"\"></div></td>"+
        "<td style=\"border: none;\" onclick=\"location='ost_switch_settings.html'\"><div class=\"from-change form-ost-health-change\">切换</div></td>\n" +
        "</tr>");
  });

}

function getDiskStorageInfo() {
  console.log("diskStorageInfo = "+diskStorageInfo[0]);
  getAimStrByRegExp(diskStorageInfo[0],MDT_NAME_PREFIX+"(.{1,100})%","g").forEach(function(val,index) {
     var mdtInfo = val.split(/\s+/);
     mdtDiskItems[index].used = mdtInfo[2];
     mdtDiskItems[index].total = mdtInfo[1];
     var mdtWorkState = mdtDiskItems[index].isActive==0?"status-gray":"status-dot-health";
    $("#mdtShow").append("<tr>\n" +
        "<td>"+mdtDiskItems[index].mdtName+"</td>\n" +
        "<td>"+mdtDiskItems[index].used+"</td>\n" +
        "<td>"+mdtDiskItems[index].total+"</td>\n" +
        "<td class='mdt-read'>未获取</td>\n" +
        "<td class='mdt-write'>未获取</td>\n" +
        "<td class='mdt-cpu-idl'>未获取</td>\n" +
        "<td class='mdt-memory-free'>未获取</td>\n" +
        "<td><div class=\"dmt-status-dot "+mdtWorkState+"\"></div></td>"+
        "<td style=\"border: none;\" onclick=\"location='mdt_switch_settings.html'\"><div class=\"from-change form-mdt-change\">切换</div></td>\n" +
        "</tr>");

    //启动websocket获取mdt的相关情况
    remoteService("serverOrder.spe",function(obj){
      initialize_websocket(obj[0],"192.168.10.214");
    });
  });
  getAimStrByRegExp(diskStorageInfo[0],OST_NAME_PREFIX+"(.{1,100})%","g").forEach(function(val,index) {
    var ostInfo = val.split(/\s+/);
    ostDiskItems[index].used = ostInfo[2];
    ostDiskItems[index].total = ostInfo[1];
  });
}

//使用websocket持续获取cpu和内存等的使用情况
function initialize_websocket(server_order,ip){
  var socket_up;
  var started;
  var valid=true;
  var homea = homeAddress(false);
  var urlstr = "ws://"+homea+"ws"+server_order+"/template?script=examples/api/mytest.template&interval=5000&ip="+ip;
  // var urlstr = "ws://"+homea+"ws"+server_order+"/template?script=examples/websocket/websocket1.template&interval=1000&num=0";
  if (typeof MozWebSocket != "undefined") {
    socket_up = new MozWebSocket(urlstr);
  }
  else {
    socket_up = new WebSocket(urlstr);
  }
  socket_up.onopen = function(evt) {
    started=true;
    //$("#show")[0].innerHTML = "showing...";
  };
  socket_up.onclose = function(evt) {
    if(started)
      return;
    if(!valid && evt.code==1006){  // can not connect
      alert("Web socket connection failed!");
    }
  };

  socket_up.onmessage = function(msg) {
    if(msg.data=="heartbeat"){
      return;
    }

    console.log("得到数据="+msg.data);

    var infos = msg.data.split("\n")[4].replace(/\|/g," ").split(/\s+/);
    console.log("得到数据切割="+infos);
    console.log("ip=" + ip);
    //$("#show")[0].innerHTML = msg.data;
    if(ip == "192.168.10.214"){
      console.log("执行渲染");
      $(".mdt-read").html(infos[10]);
      $(".mdt-write").html(infos[11]);
      $(".mdt-cpu-idl").html(infos[6]);
      $(".mdt-memory-free").html(infos[3]);
    }else{
      $("td[name='"+ip+"@tcp-read"+"']").html(infos[10]);
      $("td[name='"+ip+"@tcp-write"+"']").html(infos[11]);
      $("td[name='"+ip+"@tcp-cpu"+"']").html(infos[6]);
      $("td[name='"+ip+"@tcp-memory"+"']").html(infos[3]);
      $("td[name='"+ip+"@tcp-recv"+"']").html(infos[12]);
      $("td[name='"+ip+"@tcp-send"+"']").html(infos[13]);
    }

    if(msg.data=="12"){
      socket_up.close();
    }

  };
  socket_up.onerror = function(evt) {
    //alert(evt.data);
    valid=false;
  };
}

function getAimStrByRegExp(rawString,regString,regSignal){
  var regExp = new RegExp(regString,regSignal);
  return rawString.match(regExp);
}