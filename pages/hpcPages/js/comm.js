//jq下拉框
$(function() {
  $('select').selectOrDie();
});

//左侧导航颜色和hover
$(document).ready(function() {
  var pageIdName = '';

  $('.left .left-iterm').each(function() {
    if ($(this).attr('id') != null) {
      pageIdName = $(this).attr('id');
    }
  });

  //把-替换成_
  var reg = /-/g;
  pageIdName = pageIdName.replace(reg, '_');

  function pageName() {
    var a = location.href;
    var b = a.split('/');
    var c = b.slice(b.length - 1, b.length).toString(String).split('.');
    return c.slice(0, 1);
  }

  if (pageName() == pageIdName) {
    $('.left .left-iterm').each(function() {
      if ($(this).attr('id') != null) {
        $(this).addClass('left-iterm-font-active');
        $(this).css("pointer-events", "none");//禁用元素的:hover
      }
    });
  }

  $('.left-iterm, .left-iterm-font').hover(function() {
    $(this).addClass('left-iterm-font-hover');
    $(this).addClass("cursor_pointer");
  }, function() {
    $(this).removeClass('left-iterm-font-hover');
    $(this).removeClass("cursor_pointer");
  });
});

/*按钮hover效果*/
$(document).ready(function() {

  $('.right-header-buttom .right-header-buttom-hover').hover(function() {
    $(this).addClass('right-buttom-hover');
    $(this).addClass("cursor_pointer");
  }, function() {
    $(this).removeClass('right-buttom-hover');
    $(this).removeClass("cursor_pointer");
  });
})

/*切换按钮hover效果*/
$(document).ready(function() {

  $('.from-change').hover(function() {
    $(this).addClass("cursor_pointer");
  }, function() {
    $(this).removeClass("cursor_pointer");
  });
})



/*鼠标手势/图片旋转*/
$(document).ready(function() {

  $('.header-setting-iterm').hover(function() {
    $(this).children('.header-setting-img').rotate({ animateTo:360,center:["47%","46.5%"] })
    $(this).addClass('font-hover');
    $(this).addClass("cursor_pointer");
  }, function() {
    $('.header-setting-img').rotate({ animateTo:0,center:["47%","46.5%"] })
    $(this).removeClass('font-hover');
    $(this).removeClass("cursor_pointer");
  });

})

