<?php include_once '../../inc/common.inc.do'; ?>
<?php include_once '../../inc/domain.inc.do'; ?>
<?php include_once '../inc/site.inc.do'; ?>
<?php include_once '../inc/auth.inc.do'; ?>
<?php
$in_css				= 'hanssem.css,hs_product.css,jquery.ui.timepicker.css';
$ie_css				= 'hs_ie.css';
$ex_css				= '';

$in_js				= 'jquery.jqtransform.js,hanssem_lib.js,jquery.form.js,jquery.ui.timepicker.js,common.inc.js';
$ex_js				= '';
$page_js			= '
$(function() {$("form.jqtransform").jqTransform(); snbFunc.init(); productListAction();});
';

$page_title			= '';
$page_keywords		= '';
$page_description	= '';

$body_parm			= '';

$menu_id			= '';
$sub_id				= '';

$section_title		= '';
$section_hierarchy	= '';
?>
<?php include_once '../inc/page.head.do'; ?>


<!-- content -->
		<div id="content">
			<div class="cont_tit_wrap ctw_hs_story_slgj">
				<h2><span class="ir">��ȥ ��������Ÿ�� ���� ����</span></h2>
			</div>
			<!-- ������ -->
			<div class="hs_slgj_w">
				<!-- �߰��޴� -->
			<ul class="hs_slgj_mm slgj_mm2">
					<li><a href="story1_1.do"><img src="../images/slgj_m2_01.gif" alt="��Ʈ��" /></a></li>
					<li><a href="story1_2.do"><img src="../images/slgj_m2_02_over.gif" alt="�Ž�" /></a></li>
					<li><a href="story1_3.do"><img src="../images/slgj_m2_03.gif" alt="ħ��" /></a></li>
					<li><a href="story1_4.do"><img src="../images/slgj_m2_04.gif" alt="����" /></a></li>
					<li><a href="story1_5.do"><img src="../images/slgj_m2_05.gif" alt="�巹����" /></a></li>
				</ul>
				<!-- �������� -->
				<div class="hs_slgj_in_w hs_slgj_i2">
					<div class="hs_slgj_i_s"><img src="../images/slgj_img_2_01.jpg" alt="" /></div>
					<div class="hs_slgj_i_s"><object width="731" height="412"><param name="movie" value="http://www.youtube.com/v/ZnCpoJgftuM?version=3&amp;hl=ko_KR"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/ZnCpoJgftuM?version=3&amp;hl=ko_KR" type="application/x-shockwave-flash" width="731" height="412" allowscriptaccess="always" allowfullscreen="true"></embed></object></div>
					<div class="hs_slgj_i_s"><img src="../images/slgj_img_2_02.jpg" alt="" /></div>
					<div class="hs_slgj_i_s"><img src="../images/slgj_img_2_03.jpg" alt="" /></div>
					<div class="hs_slgj_i_s"><img src="../images/slgj_img_2_04.jpg" alt="" /></div>
					<div class="hs_slgj_i_s"><img src="../images/slgj_img_2_05.jpg" alt="" /></div>
				</div>
			</div>
		</div>
		<div class="clear"></div>






<?php include_once '../inc/page.foot.do'; ?>
<?php include_once '../../inc/fin.inc.do'; ?>
