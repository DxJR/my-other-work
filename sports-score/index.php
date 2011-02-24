<?php
$grboard = './grboard'; // GR Board 디렉토리와 동급의 위치에 페이지 파일(예: index.php)이 있을 경우
include $grboard . '/include.php';
?>



<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Sports Score</title>
<style type="text/css">/*<![CDATA[*/
@import url(grboard/latest/sirini_latest5/style.css);
@import url(grboard/outlogin/sirini_outlogin3/style.css);
@import url(grboard/latest/sirini_total_search/style.css);
/*]]>*/</style>
<script type="text/javascript" src="grboard/js/total_search.js"></script>
<link rel="stylesheet" type="text/css" href="css/ss_common.css" media="all" />
<!--[if IE]><link rel="stylesheet" type="text/css" href="css/ss_ie.css" media="all" /><![endif]-->
</head>

<body>

<!-- header -->
<div id="header">
	<?php total_search('sirini_total_search', 10); ?>
</div>

<!-- wrap -->
<div id="wrap">
	<!-- content -->
	<div id="content">
		<!-- 최근 : 자유 -->
		<?php latest('sirini_latest5', 'free', '5', '0', '0', '0', 'Y.m.d', '최근게시물', 'no', 'desc'); ?>
	</div>
	<!-- sidebar -->
	<div id="sidebar">
		<!-- 로그인 -->
		<?php outlogin('sirini_outlogin3'); ?>
	</div>
</div>

<!-- footer -->
<div id="footer">footer</div>



</body>
</html>
