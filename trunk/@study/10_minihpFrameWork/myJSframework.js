// 폼 검사
function formCheck(id) {
	var inpObj = document.getElementById(id);
	if (inpObj.value!=="") {
		var inpObjValue=inpObj.value;
	}
	inpObj.onfocus = function() {
		if (inpObj.value==inpObjValue){
			inpObj.value="";
		}
	}
	inpObj.onblur = function() {
		if (inpObj.value=="") {
			inpObj.value=inpObjValue;
		} 
	}
}


// 윈도우 리사이즈


// 탭메뉴