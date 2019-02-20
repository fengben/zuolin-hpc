$(function(){

  var rowsNumber = $("tr").size()-1;//获取行数
  var arr = [];
  function getData(){
    return arr;
  }
  add(rowsNumber)


  //增加行方法
  function add(rowsNumber){
    $("tr:gt("+rowsNumber+")").remove();//每次增加行前删除前面的行，否则会重复增加
    var data = getData();
    $.each(data,function(i, v){
      $("<tr class='add-column'>").attr("index",i).html("<td contenteditable='true' data-role='category'>" + v.category + "</td>" + "<td contenteditable='true' data-role='systemName'>" + v.systemName + "</td>" + "<td contenteditable='true' data-role='userName'>" + v.userName + "</td>" + "<td contenteditable='true' data-role='pwd'>" + v.pwd + "</td>" + "<td contenteditable='true' data-role='address1'>" + v.address1 + "</td>"+ "<td contenteditable='true' data-role='address2'>" + v.address2 + "</td>"+ "<td><div class='btn-delete-active'>删除</div></td>").insertAfter("tr:last");
    })
  }

  //点击增加按钮事件
  $('.btn-add').click(function(){
    var data = getData();
    data.push({"category": "", "systemName": "", "userName": "", "pwd": "", "address1": "", "address2": ""});
    add(rowsNumber);

  })


  //删除行方法，事件委派，根据当前点击的按钮的行的索引值
  $('table').on('click','.btn-delete-active',function(){
    var data = getData();
    var index = $(this).parent().parent().attr("index");
    data.splice(index,1);
    add(rowsNumber);
  })


  //点击编辑按钮  编辑   contenteditable=true 可编辑
  $('.edit-btn').click(function(){
    var category = $('.edit-btn').parents("tr").find(".category").attr("contenteditable","true");
    var systemName = $('.edit-btn').parents("tr").find(".systemName").attr("contenteditable","true");
    var userName = $('.edit-btn').parents("tr").find(".userName").attr("contenteditable","true");
    var pwd = $('.edit-btn').parents("tr").find(".pwd").attr("contenteditable","true");
    var address1 = $('.edit-btn').parents("tr").find(".address1").attr("contenteditable","true");
    var address2 = $('.edit-btn').parents("tr").find(".address2").attr("contenteditable","true");
  })

})
