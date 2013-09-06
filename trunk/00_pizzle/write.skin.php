<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가
?>

<link rel="stylesheet" href="<?php echo $board_skin_url ?>/style.css">

<h2 id="wrapper_title"><?php echo $g4['title'] ?></h2>

<?php 
	$sql= "select * from g4s_write_pizleclub"; 
	$result = sql_query($sql); 	
	$i = 0;
	$total =mysql_num_rows($result); 
	$categoryData = array();

	for ($i=0; $i < $total; $i++)
	{
		$resultArticleID=mysql_result($result, $i,"wr_id"); 
		$resultSubject=mysql_result($result, $i,"wr_subject"); 
		$resultAddress=mysql_result($result, $i,"wr_1"); 
		$resultAddr2=mysql_result($result, $i,"wr_2"); 
		$resultAddr3=mysql_result($result, $i,"wr_3"); 
		$categoryData[] = "$resultArticleID/$resultAddr2/$resultAddr3/$resultSubject/$resultAddress";
	}
?>

<div style="margin:10px 0; padding:15px; border:1px solid #888; background:#fcfcfc">
	<!-- 
	<? 
		$sql= "select wr_subject, wr_id, wr_1 from g4s_write_pizleclub where wr_id = '3'"; 
		$result = sql_query($sql); 
		$row=sql_fetch_array($result); 
	?> 

	글제목 : <?=$row[wr_subject]?><br />
	여분필드 : <?=$row[wr_1]?> 
	-->


	<!-- 
	<? 
		$sql= "select * from g4s_write_pizleclub"; 
		$result = sql_query($sql); 
		$row=sql_fetch_array($result); 

		print_r($row);
	?> 
	글제목 : <?=$row[wr_1]?><br />
	-->


	<? 

/*
		$sql= "select * from g4s_write_pizleclub"; 
		$result = sql_query($sql); 	
		$i = 0;

		while ($row = mysql_fetch_array($result)) {
			$list[$i] = $row;			
			echo $list[$i][wr_subject];
		}
*/
	/*
	for ($i=1; $i<= $total; $i++)
	{
		$resultSubject=mysql_result($result, $i,"wr_subject"); 

		echo "<p>$i $resultSubject</p>";
	}
	*/

	/*
	$total =mysql_num_rows($result); 
	for ($i=0,$i<$total;){ 
		$mynum=mysql_result($result,$i,"num"); 
		$myname=mysql_result($result,$i,"name"); 
		$mypassword=mysql_result($result,$i,"password"); 
		echo " $mynum $myname $mypassword "; 
	} 


		$resultSubject=mysql_result($result, $i,"wr_subject"); 
		$resultAddr=mysql_result($result,$i,"wr_1"); 
		$resultCity=mysql_result($result,$i,"wr_2"); 
		$resultAddrDetail=mysql_result($result,$i,"wr_3"); 

		echo " $resultSubject $resultAddr $resultCity $resultAddrDetail"; 
	*/

	/*
		while ($row = mysql_fetch_array($result)) 
		{ 
			echo $row["wr_1"]."<br />\n"; 
			echo $row["wr_2"]."<br />\n"; 
			echo $row["wr_3"]; 
		} 

	*/
	//	echo count($row);
	//	print_r($row);
	?> 
</div>


<!-- 게시물 작성/수정 시작 { -->
<form name="fwrite" id="fwrite" action="<?php echo $action_url ?>" onsubmit="return fwrite_submit(this);" method="post" enctype="multipart/form-data" autocomplete="off" style="width:<?php echo $width; ?>">
<input type="hidden" name="uid" value="<?php echo get_uniqid(); ?>">
<input type="hidden" name="w" value="<?php echo $w ?>">
<input type="hidden" name="bo_table" value="<?php echo $bo_table ?>">
<input type="hidden" name="wr_id" value="<?php echo $wr_id ?>">
<input type="hidden" name="sca" value="<?php echo $sca ?>">
<input type="hidden" name="sfl" value="<?php echo $sfl ?>">
<input type="hidden" name="stx" value="<?php echo $stx ?>">
<input type="hidden" name="spt" value="<?php echo $spt ?>">
<input type="hidden" name="sst" value="<?php echo $sst ?>">
<input type="hidden" name="sod" value="<?php echo $sod ?>">
<input type="hidden" name="page" value="<?php echo $page ?>">
<?php
$option = '';
$option_hidden = '';
if ($is_notice || $is_html || $is_secret || $is_mail) {
    $option = '';
    if ($is_notice) {
        $option .= "\n".'<input type="checkbox" id="notice" name="notice" value="1" '.$notice_checked.'>'."\n".'<label for="notice">공지</label>';
    }

    if ($is_html) {
        if ($is_dhtml_editor) {
            $option_hidden .= '<input type="hidden" value="html1" name="html">';
        } else {
            $option .= "\n".'<input type="checkbox" id="html" name="html" onclick="html_auto_br(this);" value="'.$html_value.'" '.$html_checked.'>'."\n".'<label for="html">html</label>';
        }
    }

    if ($is_secret) {
        if ($is_admin || $is_secret==1) {
            $option .= "\n".'<input type="checkbox" id="secret" name="secret" value="secret" '.$secret_checked.'>'."\n".'<label for="secret">비밀글</label>';
        } else {
            $option_hidden .= '<input type="hidden" name="secret" value="secret">';
        }
    }

    if ($is_mail) {
        $option .= "\n".'<input type="checkbox" id="mail" name="mail" value="mail" '.$recv_email_checked.'>'."\n".'<label for="mail">답변메일받기</label>';
    }
}

echo $option_hidden;
?>

<table id="bo_w" class="frm_tbl">
<tbody>
<?php if ($is_name) { ?>
<tr>
    <th scope="row"><label for="wr_name">이름<strong class="sound_only">필수</strong></label></th>
    <td><input type="text" name="wr_name" value="<?php echo $name ?>" id="wr_name" required class="frm_input required" size="10" maxlength="20"></td>
</tr>
<?php } ?>

<?php if ($is_password) { ?>
<tr>
    <th scope="row"><label for="wr_password">패스워드<strong class="sound_only">필수</strong></label></th>
    <td><input type="password" name="wr_password" id="wr_password" <?php echo $password_required ?> class="frm_input <?php echo $password_required ?>" maxlength="20"></td>
</tr>
<?php } ?>

<?php if ($is_email) { ?>
<tr>
    <th scope="row"><label for="wr_email">이메일</label></th>
    <td><input type="text" name="wr_email" value="<?php echo $email ?>" id="wr_email" class="frm_input email" size="50" maxlength="100"></td>
</tr>
<?php } ?>

<?php if ($is_homepage) { ?>
<tr>
    <th scope="row"><label for="wr_homepage">홈페이지</label></th>
    <td><input type="text" name="wr_homepage" value="<?php echo $homepage ?>" id="wr_homepage" class="frm_input" size="50"></td>
</tr>
<?php } ?>

<?php if ($option) { ?>
<tr>
    <th scope="row">옵션</th>
    <td><?php echo $option ?></td>
</tr>
<?php } ?>

<?php if ($is_category) { ?>
<tr>
    <th scope="row"><label for="ca_name">분류<strong class="sound_only">필수</strong></label></th>
    <td>
        <select name="ca_name" id="ca_name" required class="required">
            <option value="">선택하세요</option>
            <?php echo $category_option ?>
        </select>
		<!--
		<select>
			<?php 
				$sql= "select wr_2 from g4s_write_pizleclub where ca_name=''"; 
				$result = sql_query($sql); 	
				$i = 0;
				$k = 0;

				while ($row = mysql_fetch_array($result)) {
					$list[$i] = $row;
					
					echo "<option>".$list[$i][wr_2]."</option>";
				}
			?>
		</select>
		-->
    </td>
</tr>
<?php } ?>

<tr>
    <th scope="row"><label for="wr_subject">제목<strong class="sound_only">필수</strong></label></th>
    <td>
        <div id="autosave_wrapper">
            <input type="text" name="wr_subject" value="<?php echo $subject ?>" id="wr_subject" required class="frm_input required" size="50" maxlength="255">
            <?php if ($is_member) { // 임시 저장된 글 기능 ?>
            <script src="<?php echo G4_JS_URL; ?>/autosave.js"></script>
            <button type="button" id="btn_autosave" class="btn_frmline">임시 저장된 글 (<span id="autosave_count"><?php echo $autosave_count; ?></span>)</button>
            <div id="autosave_pop">
                <strong>임시 저장된 글 목록</strong>
                <div><button type="button" class="autosave_close"><img src="<?php echo $board_skin_url; ?>/img/btn_close.gif" alt="닫기"></button></div>
                <ul></ul>
                <div><button type="button" class="autosave_close"><img src="<?php echo $board_skin_url; ?>/img/btn_close.gif" alt="닫기"></button></div>
            </div>
            <?php } ?>
        </div>
    </td>
</tr>

<tr>
    <th scope="row"><label for="wr_1">주소</label></th>
    <td>
		<input type="text" name="wr_1" value="<?php $write[wr_1] ?>" id="wr_1" required class="frm_input required" size="50" maxlength="255">
	</td>
</tr>

<tr>
    <th scope="row"><label for="wr_content">내용<strong class="sound_only">필수</strong></label></th>
    <td class="wr_content"><?php echo $editor_html; // 에디터 사용시는 에디터로, 아니면 textarea 로 노출  ?></td>
</tr>

<?php for ($i=1; $is_link && $i<=G4_LINK_COUNT; $i++) { ?>
<tr>
    <th scope="row"><label for="wr_link<?php echo $i ?>">링크 #<?php echo $i ?></label></th>
    <td><input type="text" name="wr_link<?php echo $i ?>" value="<?php if($w=="u"){echo$write['wr_link'.$i];} ?>" id="wr_link<?php echo $i ?>" class="frm_input" size="50"></td>
</tr>
<?php } ?>

<?php for ($i=0; $is_file && $i<$file_count; $i++) { ?>
<tr>
    <th scope="row">파일 #<?php echo $i+1 ?></th>
    <td>
        <input type="file" name="bf_file[]" title="파일첨부 <?php echo $i+1 ?> :  용량 <?php echo $upload_max_filesize ?> 이하만 업로드 가능" class="frm_file frm_input">
        <?php if ($is_file_content) { ?>
        <input type="text" name="bf_content[]" value="<?php echo $file[$i]['bf_content'];  ?>" title="파일 설명을 입력해주세요." class="frm_file frm_input" size="50">
        <?php } ?>
        <?php if($w == 'u' && $file[$i]['file']) { ?>
        <input type="checkbox" id="bf_file_del<?php echo $i ?>" name="bf_file_del[<?php echo $i;  ?>]" value="1"> <label for="bf_file_del<?php echo $i ?>"><?php echo $file[$i]['source'].'('.$file[$i]['size'].')';  ?> 파일 삭제</label>
        <?php } ?>
    </td>
</tr>
<?php } ?>

<!--
<?php if ($is_guest) { //자동등록방지  ?>
<tr>
    <th scope="row">자동등록방지</th>
    <td>
        <?php echo $captcha_html ?>
    </td>
</tr>
<?php } ?>
-->
</tbody>
</table>

<div class="btn_confirm">
    <p>
       작성하신 내용을 제출하시려면 <strong>글쓰기</strong> 버튼을, 작성을 취소하고 목록으로 돌아가시려면 <strong>취소</strong> 링크를 누르세요.
    </p>
    <input type="submit" value="글쓰기" id="btn_submit" accesskey="s" class="btn_submit">
    <a href="./board.php?bo_table=<?php echo $bo_table ?>" class="btn_cancel">취소</a>
</div>
</form>

<script>
function html_auto_br(obj)
{
    if (obj.checked) {
        result = confirm("자동 줄바꿈을 하시겠습니까?\n\n자동 줄바꿈은 게시물 내용중 줄바뀐 곳을<br>태그로 변환하는 기능입니다.");
        if (result)
            obj.value = "html2";
        else
            obj.value = "html1";
    }
    else
        obj.value = "";
}

function fwrite_submit(f)
{
    <?php echo $editor_js; // 에디터 사용시 자바스크립트에서 내용을 폼필드로 넣어주며 내용이 입력되었는지 검사함   ?>

    var subject = "";
    var content = "";
    $.ajax({
        url: g4_bbs_url+"/ajax.filter.php",
        type: "POST",
        data: {
            "subject": f.wr_subject.value,
            "content": f.wr_content.value
        },
        dataType: "json",
        async: false,
        cache: false,
        success: function(data, textStatus) {
            subject = data.subject;
            content = data.content;
        }
    });

    if (subject) {
        alert("제목에 금지단어('"+subject+"')가 포함되어있습니다");
        f.wr_subject.focus();
        return false;
    }

    if (content) {
        alert("내용에 금지단어('"+content+"')가 포함되어있습니다");
        if (typeof(ed_wr_content) != "undefined")
            ed_wr_content.returnFalse();
        else
            f.wr_content.focus();
        return false;
    }

//    <?php echo $captcha_js; // 캡챠 사용시 자바스크립트에서 입력된 캡챠를 검사함  ?>

    document.getElementById("btn_submit").disabled = "disabled";

    return true;
}
</script>
<!-- } 게시물 작성/수정 끝 -->
