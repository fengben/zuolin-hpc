//jq下拉框
$(function() {
	$('select').selectOrDie();
});

//左侧导航颜色和hover
$(document).ready(function() {


	function pageName() {
		var a = location.href;
		var b = a.split('/');
		var c = b.slice(b.length - 1, b.length).toString(String).split('.');
		return c.slice(0, 1);
	}
	var item = $('.left .left-iterm')
	var item_len = $('.left .left-iterm').length //获取左侧菜单子类的个数
	for (var i = 0; i < item_len; i++) {
		if (item[i].id == pageName()) {
			$('.left .left-iterm').eq(i).addClass('left-iterm-font-active');
			$('.left .left-iterm').eq(i).css("pointer-events", "none"); //禁用元素的:hover
		}
	}
	$('.left-iterm').hover(function() {
		$(this).addClass("cursor_pointer");
	}, function() {
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
		$(this).children('.header-setting-img').rotate({
			animateTo: 360,
			center: ["47%", "46.5%"]
		})
		$(this).addClass('font-hover');
		$(this).addClass("cursor_pointer");
	}, function() {
		$('.header-setting-img').rotate({
			animateTo: 0,
			center: ["47%", "46.5%"]
		})
		$(this).removeClass('font-hover');
		$(this).removeClass("cursor_pointer");
	});

})

// 左右滑动的开关
$(function() {
	$('.btnn').on('click', function() {
		if ($(this).attr('isopen') == 'false') {
			$(this).attr('isopen', 'true').animate({
				left: '27px'
			});
			$(this).parent().css('background-color', 'green');
		} else {
			$(this).attr('isopen', 'false').animate({
				left: '1px'
			});
			$(this).parent().css('background-color', '#838383');
		}
	});
});
