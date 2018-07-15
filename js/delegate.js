var MOBILE_REGEX = /^(\+\d{1,3}[- ]?)?\d{10}$/;
var EMAIL_REGEX = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

$(document).ready(function(){
	$(".btn-twitter").off("click").on("click" ,function(){
		signInDelegate();
	});
	window.time = null;
});

function signInDelegate(){
	var success = true;
	if($("#lname").val() == "" || $("#lname").val() == null || $("#fname").val() == "" || $("#fname").val() == null || $("#phNumber").val() == "" || $("#phNumber").val() == null || $("#demail").val() == "" || $("#demail").val() == null ){
		success = false;
		showErrorNoty("Please fill all fields");
	} 
	if($("#listBox").val() == "SELECT STATE"){
		success = false;
		showErrorNoty("Please select your state");
	}
	if($("#phNumber").val() != ""){
		if(!MOBILE_REGEX.test($("#phNumber").val())) {
			success = false;
			showErrorNoty("Please Enter Valid Phone Number");
		}
	}
	if($("#demail").val() != ""){
		if(!EMAIL_REGEX.test($("#demail").val())) {
			success = false;
			showErrorNoty("Please Enter Valid Email Id");
		}
	}
	if(success){
		var delegate = new formToObject("msform");
		var d = new Date();
		window.time = d.getTime();
		delegate["id"] = window.time;
		var DELEGATE_PROFILE_URL = "http://skochvoting.tk/b/uAuth/user/save_form"; 
		sendPostRequest(DELEGATE_PROFILE_URL, JSON.stringify(delegate), delegateSuccess, delegateError);
	}
}
function delegateSuccess(data){
	if(data["success"] == true){
		$("#msform").trigger("reset");
		window.location = "twitter_standalone/index.php?id=" + window.time;
	}
}
function delegateError(error){
	showErrorNoty(error);
}
