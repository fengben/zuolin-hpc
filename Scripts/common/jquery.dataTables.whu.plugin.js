/// 文 件 名：jquery.dataTables.whu.plugin
/// 描    述：开发针对相应的dataTables相应的jquery应用的插件
/// 项目名称：cardiac
/// 作    者：武汉大学国家网络安全学院@沈家强
/// 发布日期：2019/2/17 0017 0:23
/// 文件版本：V1.0
/// 注意：本内容仅限于武汉大学国家网络安全学院陈刚教授团队内部传阅，禁止外泄以及用于其他的商业目
/// @Copyright: 2019 www.whu.edu.cn. All rights reserved.
/// All rights Reserved, Designed By www.whu.edu.cn

(function($){
  //配置相应的显示语言
  var lang = {
    "sProcessing": "处理中...",
    "sLengthMenu": "每页 _MENU_ 项",
    "sZeroRecords": "没有匹配结果",
    "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
    "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
    "sInfoPostFix": "",
    "sSearch": "搜索:",
    "sUrl": "",
    "sEmptyTable": "表中数据为空",
    "sLoadingRecords": "载入中...",
    "sInfoThousands": ",",
    "oPaginate": {
      "sFirst": "首页", "sPrevious": "上页", "sNext": "下页", "sLast": "末页", "sJump": "跳转"
    },
    "oAria": {
      "sSortAscending": ": 以升序排列此列", "sSortDescending": ": 以降序排列此列"
    }
  };

  /**
   * 相应的dataTables的包装类
   * @param optionsA
   */
  $.fn.zlDataTables = function(url, outParam={}, columnsDataMap=[], type="GET", dataType="json"){
    this.dataTable({
      language: lang, //提示信息
      processing: true, //是否显示相应的状态变化
      serverSide: true, //开启ajax功能
      pageLength :25,//默认每页显示多少条记录
      ordering: false,  // 是否开启排序功能(默认开启)
      searchDelay: 1000, //搜索时间隔 1秒,以免每个输入都发送相应的搜索请求
      deferRender:true,  //控制表格的延迟渲染，1可以提高初始化的速度
      paging:false, //去掉底部文字
      info:false,
      ajax: function (data, callback, settings) {
        //封装请求参数
        // var param = {};
        outParam.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
        outParam.start = data.start;//开始的记录序号
        outParam.currentPage = (data.start / data.length) + 1;//当前页码
        outParam.keyWord = data.search.value;
        $.ajax({
          type: type,
          url: url,
          cache: false, //禁用缓存
          data: outParam, //传入组装的参数
          dataType: dataType,
          success: function (result) {
            var returnData = {};
            returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
            returnData.recordsTotal = result.total;//返回数据全部记录
            returnData.recordsFiltered = result.total;//后台不实现过滤功能，每次查询均视作全部结果
            returnData.data = result.data;//返回的数据列表
            //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
            callback(returnData);
          }
        });
      },
      "columns": columnsDataMap
    });
  };
})(jQuery);