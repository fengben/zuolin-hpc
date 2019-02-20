//获取数据
function load_info() {
  var obj = new Array();
  var praseResult = function () {
    console.log(obj[0]);
    cleaned = clean_data(obj[0]);
    alert(cleaned);
  };
  getFromWS("hpc_static_template/getStatus.template", "", obj, praseResult);
}

//处理数据成二维数组
function clean_data(data) {
  line = data.split("\n");
  for (var i = 0; i < line.length; i++) {
    line[i] = line[i].split(/[ ]+/);
  }
  console.log(line);
  json_data(line);
  return line;
}

//处理成json字符串
function json_data(line) {
  alert(line.length);
  jsonData = {};
  jsonArray = [];
  for (var i = 1; i < line.length; i++){
    singleJson = {};
    singleJson.name = line[i][0];
    singleJson.status = line[i][1];
    console.log(singleJson);
    jsonArray[i-1] = singleJson;
  }
  jsonData.data = jsonArray;
  console.log(jsonData);
  return jsonData;
}