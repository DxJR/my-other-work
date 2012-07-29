jQuery(function($){
	// Common
	var select_root = $('div.select');
	var select_value = $('.my_value');
	var select_a = $('div.select>ul>li>a');
	var select_input = $('div.select>ul>li>input[type=radio]');
	var select_label = $('div.select>ul>li>label');

	// Radio Default Value
	$('div.my_value').each(function(){
		var default_value = $(this).next('.i_list').find('input[checked]').next('label').text();
		$(this).append(default_value);
	});

	// Line
	select_value.bind('focusin',function(){$(this).addClass('outLine')});
	select_value.bind('focusout',function(){$(this).removeClass('outLine')});
	select_input.bind('focusin',function(){$(this).parents('div.select').children('div.my_value').addClass('outLine')});
	select_input.bind('focusout',function(){$(this).parents('div.select').children('div.my_value').removeClass('outLine')});

	// Show
	function show_option(){
		$(this).parents('div.select:first').toggleClass('open');
	}

	// Hover
	function i_hover(){
		$(this).parents('ul:first').children('li').removeClass('hover');
		$(this).parents('li:first').toggleClass('hover');
	}

	// Hide
	function hide_option(){
		var t = $(this);
		setTimeout(function(){
			t.parents('div.select:first').removeClass('open');
		}, 1);
	}

	// Set Input
	function set_label(){
		var v = $(this).next('label').text();
		$(this).parents('ul:first').prev('.my_value').text('').append(v);
		$(this).parents('ul:first').prev('.my_value').addClass('selected');
	}

	// Set Anchor
	function set_anchor(){
		var v = $(this).text();
		$(this).parents('ul:first').prev('.my_value').text('').append(v);
		$(this).parents('ul:first').prev('.my_value').addClass('selected');
	}

	// Anchor Focus Out
	$('*:not("div.select a")').focus(function(){
		$('.a_list').parent('.select').removeClass('open');
	});

	select_value.click(show_option);
	select_root.removeClass('open');
	select_root.mouseleave(function(){$(this).removeClass('open')});
	select_a.click(set_anchor).click(hide_option).focus(i_hover).hover(i_hover);
	select_input.change(set_label).focus(set_label);
	select_label.hover(i_hover).click(hide_option);
});

// show layer
function showLayer(id) {
		var obj = document.getElementById(id);
		obj.style.display='inline';
}

// close layer
function closeLayer(id) {
		var obj = document.getElementById(id);
		obj.style.display='none';
}

// snb
var snbFunc = ({
	init : function() {
		ul3depth = $(".m_3d_snb");
		parentEle = $(".m_2d_snb>li.last");
		this.snbAnimation();
	},

	snbAnimation : function() {
		$(".m_2d_snb>li.last .b_s2_product").each(function(index){
			$(this).click(function(){
				var parentClass = $(this).parent().attr("class");
				if (parentClass=="last")
				{
					$(this).blur();
					$(this).parent().addClass("now");
					$(this).next().slideDown(250);
				} else {
					$(this).blur();
					$(this).parent().removeClass("now");
					$(this).next().slideUp(250);
				}
			});
		});

	},

	resetClass : function() {
		for (var i=0; i < parentEle.length ; i++ )
		{
			parentEle[i].className='last';
		}
	}
});

function productListAction() {
	$(".hsp_thumb").bind('mouseover', function() {
		$(".hsp_thumb").prev().css('display','none');
		$(this).prev().css('display','block');
	});
	$(".hsp_thumb").prev().bind('mouseleave', function() {
		$(this).css('display','none');
	})
}