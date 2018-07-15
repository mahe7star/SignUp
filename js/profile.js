$(document).ready(function(){
	profileDetail();
	$("#submitBtn").click(function(){
		profileDetails();
	});
});
function profileDetails(){
	var MOBILE_REGEX = /^(\+\d{1,3}[- ]?)?\d{10}$/;
	var EMAIL_REGEX = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var success = true;
	if($("#fname").val() == null || $("#fname").val() == "" || $("#phone").val() == null || $("#phone").val() == "" || $("#company").val() == null || $("#company").val() == "" || $("#email").val() == null || $("#email").val() == ""){
		succses = false;
		showErrorNoty("Please fill all fields!");
	}
	if($("#listBox").val()== "SELECT STATE"){
		success = false;
		showErrorNoty("Please select a state!");
	}
	if(!$("#agree").is(":checked")){
		success = false;
		showErrorNoty("Please agree to our terms and conditions!");
	}
	if($("#phone").val() != ""){
		if(!MOBILE_REGEX.test($("#phone").val())){
			success = false;
			showErrorNoty("Please enter valid mobile number!");
		}
	}
	if($("#email").val() != ""){
		if(!EMAIL_REGEX.test($("#email").val())){
			success = false;
			showErrorNoty("Please enter valid email id!");
		}
	}
	if(success){
		var profile = new formToObject("msform");
		profile["_id"] = localStorage.getItem("user-id");
		var USER_PROFILE = "http://skochvoting.tk/b/uAuth/user/user_profile_update";
		sendPostRequest(USER_PROFILE, JSON.stringify(profile), updateProfileSuccess, updateProfileError);
	}
}

function updateProfileSuccess(data){
	if(data["success"] == true){
		$("#msform").trigger("reset");
		window.location = "../index.php";
	}
}

function updateProfileError(error) {
	showErrorNoty(error);
}
function profileDetail(){
	var uid = localStorage.getItem("user-id");
	var url = "http://skochvoting.tk/b/uAuth/user/fetch_user_details/"+uid;
	sendGetRequest(url, urlSuccess, urlError);
}
function urlSuccess(data){
	if(data["success"] == true){
		$("#fname").val(data.result["fullName"]);
		$("#email").val(data.result["email"]);
	}
}

function urlError(){

}