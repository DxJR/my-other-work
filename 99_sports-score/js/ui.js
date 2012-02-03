$(document).ready(function() {	 
	$("#r_list01 .rlist").hide();
	$("#r_list01 ul.rlt li:first").addClass("this").show();
	$("#r_list01 .rlist:first").show();
	$("#r_list01 ul.rlt li").click(function() {
		$("#r_list01 ul.rlt li").removeClass("this");
		$(this).addClass("this");
		$("#r_list01 .rlist").hide();
		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn();
		return false;
	});	 
});
$(document).ready(function() {	 
	$("#r_list02 .rlist").hide();
	$("#r_list02 ul.rlt li:first").addClass("this").show();
	$("#r_list02 .rlist:first").show();
	$("#r_list02 ul.rlt li").click(function() {
		$("#r_list02 ul.rlt li").removeClass("this");
		$(this).addClass("this");
		$("#r_list02 .rlist").hide();
		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn();
		return false;
	});	 
});
$(document).ready(function() {	 
	$("#r_list04 .rlist").hide();
	$("#r_list04 ul.rlt li:first").addClass("this").show();
	$("#r_list04 .rlist:first").show();
	$("#r_list04 ul.rlt li").click(function() {
		$("#r_list04 ul.rlt li").removeClass("this");
		$(this).addClass("this");
		$("#r_list04 .rlist").hide();
		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn();
		return false;
	});	 
});