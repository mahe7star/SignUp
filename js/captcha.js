$(document).ready(function () {
  $("#forgotPass").click(function(){
    setTimeout(function(){
     var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
     var i;
     for (i=0;i<6;i++){
       var a = alpha[Math.floor(Math.random() * alpha.length)];
       var b = alpha[Math.floor(Math.random() * alpha.length)];
       var c = alpha[Math.floor(Math.random() * alpha.length)];
       var d = alpha[Math.floor(Math.random() * alpha.length)];
       var e = alpha[Math.floor(Math.random() * alpha.length)];
       var f = alpha[Math.floor(Math.random() * alpha.length)];
       var g = alpha[Math.floor(Math.random() * alpha.length)];
      }
      var res = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' '+ f + ' ' + g;
      $("#mainCaptcha").val(res);
      $("#mainCaptcha").prop("disabled", true);
  
    },500);
  });
  $("#modalLoginForm").find(".close").click(function(){
    $("#modalLoginForm").hide("modal");
  });
  
});
    
function IsValid(){

  var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
  var string2 = removeSpaces(document.getElementById('txtInput').value);
  if(string2 == null || string2 == ""){
    showErrorNoty("Enter the captcha please!");
    return;
  } else if (string1 == string2){
    alert("true");
  }
  else{        
    alert("false");
  }
}
    
function removeSpaces(string){
  return string.split(' ').join('');
}  

function reloadCap(){
  var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
 var i;
 for (i=0;i<6;i++){
   var a = alpha[Math.floor(Math.random() * alpha.length)];
   var b = alpha[Math.floor(Math.random() * alpha.length)];
   var c = alpha[Math.floor(Math.random() * alpha.length)];
   var d = alpha[Math.floor(Math.random() * alpha.length)];
   var e = alpha[Math.floor(Math.random() * alpha.length)];
   var f = alpha[Math.floor(Math.random() * alpha.length)];
   var g = alpha[Math.floor(Math.random() * alpha.length)];
  }
  var res = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' '+ f + ' ' + g;
  $("#mainCaptcha").val(res);
  $("#mainCaptcha").prop("disabled", true);
}