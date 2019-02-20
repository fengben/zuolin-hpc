$(function() {
  var obj = new Array();
  $("#show").click(function() {
      getFromWS("/examples/api/getHostList.template","",obj,showHostList);
  })
  function showHostList() {
    alert("回调函数执行");
    $('#hostContent').html(obj[0]);
  }

})

