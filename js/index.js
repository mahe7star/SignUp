
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var MOBILE_REGEX = /^(\+\d{1,3}[- ]?)?\d{10}$/;
var PASS_REGEX = /^(?=.*\d).{8,20}$/;
var SIGN_UP_URL = "http://analysttemp.tk:3020/auth/register_user";
var SIGN_IN_URL = "http://analysttemp.tk:3020/auth/login";
var LOG_OUT_URL = "http://skochvoting.tk/b/uAuth/auth/logout";


$(document).ready(function(){
	$("#msform").keyup(function(event) {
		if (event.keyCode === 13) {
		    $("#signin").click();
		}
	});

	$("#signinBtn").click(function(){
		window.location.href = "signin.html";
	});

	$("#msform #fieldset1").keyup(function(event) {
		if (event.keyCode === 13) {
		    $(".next").click();
		}
	});

	$("#msform #fieldset2").keyup(function(event) {
		if (event.keyCode === 13) {
		    $("#submitBtn").click();
		}
	});

	$("#submitBtn").off("click").on("click", function(){
		var sub = new SignUp();
		sub.signUp();
	});
	$("#signin").off("click").on("click", function(){
		var sign = new SignIn();
		sign.signIn();
	});
	 $("#logOut").click(function(){
	 	logOut();
	 });
	
	 $("#signTwitter").click(function(){
	 	twitterSign();
	 });
	 $("#signGoogle").click(function(){
	 	googleSign();
	 });
	 $(".previous").click(function(){
	 	prev();
	 });
	//  $("#forgotPass").click(function(){
	//  	$("#modalLoginForm").show("modal");
	//  });
});

function prev(){
	$("#fieldset1").css("display", "block");
	$("#fieldset2").css("display","none");
	$("#field2").removeClass("active");
}

	
 function firstNext(event) {

		success = true;
		var EMAIL_REGEX = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(isEmpty($("#email").val())) {
			success = false;
			$("#emailerror").text("Enter Your Email Id")
			$("#emailerror").parent().css("border","1px solid #f19e9e");
			$("#emailerror").css("display","inline");
		} else if(!EMAIL_REGEX.test($("#email").val())) {
			success = false;
			$("#emailerror").text("Enter Valid Email Id");
			$("#emailerror").parent().css("border","1px solid #f19e9e");
			$("#emailerror").css("display","inline");
		} else {
			$("#emailerror").text("")
			$("#emailerror").css("display","none");
		}
		if(isEmpty($("#password").val())) {
			success = false;
			$("#passerror").text("Enter Your Password");
			$("#passerror").parent().css("border","1px solid #f19e9e");
			$("#passerror").css("display","inline");	
		} else if(!PASS_REGEX.test($("#password").val())) {
			success = false;
			$("#passerror").text("Enter a Valid Password");
			$("#passerror").parent().css("border","1px solid #f19e9e");
			$("#passerror").css("display","inline");
		} else {
			//success = true;
			$("#passerror").text("")
			$("#passerror").css("display","none");
		}
 		if(isEmpty($("#conpassword").val())) {
			success = false;
			$("#conpasserror").text("Re-Enter Your Password");
			$("#conpasserror").parent().css("border","1px solid #f19e9e");
			$("#conpasserror").css("display","inline");
		} else if(!isEmpty($("#conpassword").val()) && ($("#password").val() != $("#conpassword").val())) {
			success = false;
			$("#conpasserror").text("Passwords do not match");
			$("#conpasserror").parent().css("border","1px solid #f19e9e");
			$("#conpasserror").css("display","inline");
		} else {
			//success = true;
			$("#conpasserror").text("")
			$("#conpasserror").css("display","none");
		}

		if(success) {
			$("#field2").addClass("active");
			$("#fieldset1").css("display", "none");
			$("#fieldset2").css("display","block");
	}
}

function SignUp() {
	this.signUp = function() {
		var nsuccess = true;
		if(isEmpty($("#fname").val()) || isEmpty($("#lname").val())){
			nsuccess = false;
			$("#nameerror").text("Enter your complete name");
			$("#nameerror").css("display","inline");
		} else {
			//nsuccess = true;
			$("#nameerror").text("")
			$("#nameerror").css("display","none");
		}
		if(isEmpty($("#phone").val())){
			nsuccess = false;
			$("#phoneerror").text("Enter Your Phone Number");
			$("#phoneerror").css("display","inline");
		} else if(!MOBILE_REGEX.test($("#phone").val())) {
			nsuccess = false;
			$("#phoneerror").text("Enter Valid Phone Number");
			$("#phoneerror").css("display","inline");
		} else {
			//nsuccess = true;
			$("#phoneerror").text("");
			$("#phoneerror").css("display","none");
		}
		if(isEmpty($("#company").val())){
			nsuccess = false;
			$("#companyerror").text("Enter Organisation's Name");
			$("#companyerror").css("display","inline");
		} else {
			//nsuccess = true;
			$("#companyerror").text("");
			$("#companyerror").css("display","none");
		}
		if($("#listBox").val() == "SELECT STATE"){
			nsuccess = false;
			$("#stateerror").text("Select Your State");
			$("#stateerror").css("display","inline");
		} else {
			//nsuccess = true;
			$("#stateerror").text("");
			$("#stateerror").css("display","none");
		}
		if(isEmpty($("#city").val())){
			nsuccess = false;
			$("#cityerror").text("Enter Your City");
			$("#cityerror").css("display","inline");
		} else {
			//nsuccess = true;
			$("#cityerror").text("");
			$("#cityerror").css("display","none");
		}
		var checkBox = $("#agree").is(":checked");
		if(checkBox == false){
			nsuccess = false;
			$("#termerror").css("display","inline");
		} else{
			$("#termerror").css("display","none");
		}

		if (nsuccess) {
			$("#submitBtn").prop("disabled", "true");
			sendingRequest();
		}
	}
}

function isEmpty(value) {
	if (value == undefined || value == null || value.trim() == "") {
		return true;
	}
	return false;
}

function sendingRequest(){
	var msform = new formToObject('msform');
	var emailToLower = $("#email").val();
	msform["email"] = emailToLower.toLowerCase();
	console.log(msform);
	sendPostRequest(SIGN_UP_URL, JSON.stringify(msform),signUpSuccess, signUpError);
}

function signUpSuccess(data) {
 if(data["success"] == true ){
	 $("#msform").trigger("reset");
	 $("#prev").css("display","none");
	 $("#submitBtn").css("display","none");
	 $("#msform").each(function(){
     	// $(this).find(':input').prop("disabled","true"); //<-- Should return all input elements in that specific form.
		 $(this).find("input").css("display", "none");
	 });
	 $("#msform").find(".in-group").hide();
	 // $("#listBox").prop("disabled","true");
	 // $("#signinBtn").removeAttr("disabled");
	 $("#listBox").css("display", "none");
	 $("#signinBtn").css("display","inline-block");
	 $("#success").css("display","inline-block");
	 $(".fs-title").css("display","none");
	 $("#condition").css("display","none");
	 $(".back2signin").hide();
	} else if(data["success"]==false) {
		$("#submitBtn").removeAttr("disabled");
		showErrorNoty(data["error"]);
	}
}

function signUpError(error) {
	$("#submitBtn").removeAttr("disabled");
	alert(error + "  Please try again later")
}


function SignIn() {
	this.signIn = function() {
		var success = true;
		// showErrorNoty("Please try signing in with twitter!");
		// return;
		if(isEmpty($("#semail").val())){
			success = false;
			$("#semailerror").text("Enter Your Email Id");
			$("#semailerror").css("display","inline");
		} else {
			$("#semailerror").text("");
			$("#semailerror").css("display","none");
		}
		if(isEmpty($("#spassword").val())){
			success = false;
			$("#spasserror").text("Enter Your Password");
			$("#spasserror").css("display","inline");
		} else {
			$("#semailerror").text("");
			$("#semailerror").css("display","none");
		}
		// if(window.captcha != true){
		// 	success = false;
		// 	showErrorNoty("Select captcha before signing in!");
		// }
		if(success){
			$("#signin").prop("disabled", "true");
			sendingSignInRequest();
		}
	}
}

function sendingSignInRequest(){
	var msform = new formToObject('msform');
	var emailToLower = $("#semail").val();
	msform["email"] = emailToLower.toLowerCase();
	sendPostRequest(SIGN_IN_URL, JSON.stringify(msform),signInSuccess, signInError);
}

function signInSuccess(data) {
	if(data["success"] == true){
		localStorage.clear();
		localStorage.setItem("user-id", data["user"]["id"]);
		var date = new Date();
		var time = date.getTime();
		localStorage.setItem("time-stamp", time);
		
		// save to cookie		
		var d = new Date();
		d.setTime(d.getTime() + (10*24*60*60*1000));
    		var expires = "expires="+ d.toUTCString();
    		document.cookie = "uid=" + data["user"]["id"] + ";" + expires + ";path=/";
		
		window.location.href = "../activeVoting.html";
	} else if(data["success"] == false){
		$("#signin").removeAttr("disabled");
		showErrorNoty(data["error"]);
	}
}

function signInError(error) {
	$("#signin").removeAttr("disabled");
	showErrorNoty(error);
}

function logOut(){
	sendGetRequest(LOG_OUT_URL, logOutSuccess, logOutFailure);
}

function logOutSuccess(data) {
	if(data["success"] == true){
		document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		localStorage.clear();
	    $(".tg-btnopenclose").css("display", "none");
	    $('.tg-btnbecommember').css("display", "inline-block");
	    location.reload();
	}
}

function logOutFailure(error){
	alert(error);
}
